"""Optional same-origin static host and two-party WebRTC signaling service.

No files, messages, application results or device commands are relayed here.
Run from the supplied package; see README.md for HTTPS setup.
"""
import asyncio
import json
import os
import secrets
import ssl
import time
from pathlib import Path
from aiohttp import web, WSMsgType

PROJECT = Path(__file__).resolve().parent.parent
ROOT = Path(os.getenv('CONNECTION_STATIC_ROOT', str(PROJECT / 'dist'))).resolve()
ROOMS = {}
CLIENTS = set()
TTL = 300
MAX_CLIENTS = 64
ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
ALLOWED = {'index.html', 'guide.html', 'sw.js', 'registry.generated.json', 'manifest.webmanifest', 'Calc_Studio(1).html', 'Calc_Studio_Connection.html', 'Calc_Studio_Guide(2).html', 'Calc_Studio_Guide_Tool.html'}

async def static(request):
    name = request.match_info.get('name') or 'index.html'
    candidate = (ROOT / name).resolve()
    allowed = name in ALLOWED or name.startswith(('assets/', 'runtime/', 'connections/', 'offline/'))
    if not allowed or not candidate.is_relative_to(ROOT) or not candidate.is_file() or any(part.startswith('.') for part in Path(name).parts):
        raise web.HTTPNotFound()
    return web.FileResponse(candidate, headers={
        'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer', 'X-Frame-Options': 'DENY'})

def allowed_origin(request):
    origin = request.headers.get('Origin', '')
    expected = f'{request.scheme}://{request.host}'
    extras = {v.strip() for v in os.getenv('CONNECTION_ALLOWED_ORIGINS', '').split(',') if v.strip()}
    return origin == expected or origin in extras

async def signaling(request):
    if not allowed_origin(request):
        raise web.HTTPForbidden(text='Origin is not allowed')
    if len(CLIENTS) >= MAX_CLIENTS:
        raise web.HTTPServiceUnavailable(text='Too many clients')
    ws = web.WebSocketResponse(max_msg_size=70000, heartbeat=25)
    await ws.prepare(request)
    CLIENTS.add(ws)
    room_code = None
    host = False
    window = time.monotonic()
    count = 0
    async def error(text):
        await ws.send_json({'t': 'error', 'message': text})
    try:
        async for msg in ws:
            if msg.type != WSMsgType.TEXT:
                if msg.type == WSMsgType.ERROR:
                    break
                continue
            now = time.monotonic()
            if now - window > 60:
                window, count = now, 0
            count += 1
            if count > 30:
                await error('Too many requests; reconnect in a minute')
                await ws.close(code=1008)
                break
            try:
                data = json.loads(msg.data)
                if not isinstance(data, dict):
                    raise ValueError()
                kind = data.get('t')
                if kind == 'host' and room_code is None:
                    room_code = ''.join(secrets.choice(ALPHABET) for _ in range(24))
                    host = True
                    ROOMS[room_code] = {'host': ws, 'guest': None, 'expires': now + TTL}
                    await ws.send_json({'t': 'room', 'code': room_code})
                elif kind == 'join' and room_code is None:
                    code = data.get('code')
                    room = ROOMS.get(code) if isinstance(code, str) else None
                    if not room or room['expires'] <= now or room['guest'] is not None or room['host'].closed:
                        await error('Code is invalid, expired or already in use')
                        continue
                    room_code = code
                    room['guest'] = ws
                    await ws.send_json({'t': 'joined'})
                    await room['host'].send_json({'t': 'peer'})
                elif kind == 'signal' and room_code in ROOMS:
                    room = ROOMS[room_code]
                    payload = data.get('data')
                    description = payload.get('description', {}) if isinstance(payload, dict) else {}
                    if room['expires'] <= now or payload.get('format') != 'calc-studio-connection' or payload.get('version') != 1:
                        raise ValueError()
                    if description.get('type') != ('offer' if host else 'answer') or not isinstance(description.get('sdp'), str) or len(description['sdp']) > 60000:
                        raise ValueError()
                    peer = room['guest' if host else 'host']
                    if peer is None or peer.closed:
                        await error('The other device is not available')
                    else:
                        await peer.send_json({'t': 'signal', 'data': payload})
                else:
                    await error('Unsupported request or room state')
            except (ValueError, TypeError, AttributeError):
                await error('Invalid pairing request')
    finally:
        CLIENTS.discard(ws)
        room = ROOMS.pop(room_code, None)
        if room:
            other = room['guest' if host else 'host']
            if other is not None and not other.closed:
                await other.send_json({'t': 'left'})
    return ws

async def expiry(app):
    async def sweep():
        while True:
            await asyncio.sleep(10)
            for code, room in list(ROOMS.items()):
                if room['expires'] <= time.monotonic():
                    ROOMS.pop(code, None)
                    for ws in [room['host'], room['guest']]:
                        if ws is not None and not ws.closed:
                            await ws.send_json({'t': 'error', 'message': 'Pairing code expired. An established peer connection can continue.'})
                            await ws.close()
    task = asyncio.create_task(sweep())
    yield
    task.cancel()
    await asyncio.gather(task, return_exceptions=True)
    await asyncio.gather(*(ws.close() for ws in list(CLIENTS)), return_exceptions=True)

app = web.Application(client_max_size=70000)
app.router.add_get('/signal', signaling)
app.router.add_get('/', static)
app.router.add_get('/{name:.*}', static)
app.cleanup_ctx.append(expiry)

if __name__ == '__main__':
    context = None
    cert, key = os.getenv('CONNECTION_TLS_CERT'), os.getenv('CONNECTION_TLS_KEY')
    if bool(cert) != bool(key):
        raise SystemExit('Set both CONNECTION_TLS_CERT and CONNECTION_TLS_KEY')
    if cert:
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(cert, key)
    web.run_app(app, host=os.getenv('CONNECTION_HOST', '127.0.0.1'),
                port=int(os.getenv('CONNECTION_PORT', '8765')), ssl_context=context,
                access_log=None)
