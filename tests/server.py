import asyncio, importlib.util, json, time
from pathlib import Path
from aiohttp import web, ClientSession, WSServerHandshakeError
spec=importlib.util.spec_from_file_location('connection_server', 'Connection_Server/server.py')
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
checks=[];failures=[]
def check(value,name):
    checks.append(name)
    if not value:failures.append(name)
    print('PASS' if value else 'FAIL',name,flush=True)
async def main():
    runner=web.AppRunner(module.app);await runner.setup();site=web.TCPSite(runner,'127.0.0.1',0);await site.start()
    port=site._server.sockets[0].getsockname()[1];origin=f'http://127.0.0.1:{port}';url=origin+'/signal'
    try:
      async with ClientSession() as client:
        async with client.get(origin+'/Calc_Studio_Connection.html') as r:
            check(r.status==200 and r.headers.get('X-Frame-Options')=='DENY','Host serves Connection page with frame protection')
        for route in ['games/index.html','games/app.js','games/analysis-worker.bundle.js','Calc_Studio_Games.html']:
            async with client.get(origin+'/'+route) as r:check(r.status==200,'Static Games route '+route)
        for route in ['games/.secret','src/core/context.js','Connection_Server/server.py']:
            async with client.get(origin+'/'+route) as r:check(r.status==404,'Source/hidden path excluded '+route)
        async with client.get(origin+'/server.py') as r:check(r.status==404,'Static allowlist excludes server source')
        try:
            await client.ws_connect(url,origin='https://attacker.example')
            check(False,'Unapproved WebSocket origin rejected')
        except WSServerHandshakeError as e:check(e.status==403,'Unapproved WebSocket origin rejected')
        host=await client.ws_connect(url,origin=origin);await host.send_json({'t':'host'});room=await host.receive_json();code=room['code'];check(len(code)==24,'Server issues cryptographically random 24-character room code')
        guest=await client.ws_connect(url,origin=origin);await guest.send_json({'t':'join','code':'A'*24});check((await guest.receive_json())['t']=='error','Unknown pairing code rejected')
        await guest.send_json({'t':'join','code':code});check((await guest.receive_json())['t']=='joined' and (await host.receive_json())['t']=='peer','Exactly two peers join a room')
        third=await client.ws_connect(url,origin=origin);await third.send_json({'t':'join','code':code});check((await third.receive_json())['t']=='error','Third participant rejected')
        await host.send_str('not json');check((await host.receive_json())['t']=='error','Malformed signaling JSON rejected without dropping valid room')
        payload={'format':'calc-studio-connection','version':1,'description':{'type':'offer','sdp':'v=0\r\n'}}
        await host.send_json({'t':'signal','data':payload});check((await guest.receive_json())['data']==payload,'Host offer relayed only to room guest')
        await guest.send_json({'t':'signal','data':payload});check((await guest.receive_json())['t']=='error','Guest cannot impersonate host offer')
        payload['description']['type']='answer';await guest.send_json({'t':'signal','data':payload});check((await host.receive_json())['data']==payload,'Guest answer relayed to correct host')
        await guest.close();check((await host.receive_json())['t']=='left' and code not in module.ROOMS,'Guest disconnect removes invitation and notifies host')
        await host.close();await third.close()
        host=await client.ws_connect(url,origin=origin);await host.send_json({'t':'host'});code=(await host.receive_json())['code'];module.ROOMS[code]['expires']=time.monotonic()-1
        guest=await client.ws_connect(url,origin=origin);await guest.send_json({'t':'join','code':code});check((await guest.receive_json())['t']=='error','Expired pairing code rejected')
        await host.close();await guest.close()
    finally:await runner.cleanup()
    Path('test-results/server-test-results.json').write_text(json.dumps({'checks':len(checks),'failures':failures},indent=2))
    if failures:raise SystemExit(1)
asyncio.run(main())
