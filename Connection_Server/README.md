# Calc Studio Connection server

This optional helper serves the bundled HTML pages and exchanges WebRTC offers/answers using short-lived pairing codes. It does not relay files, messages, photos, results, or remote commands. No service is hosted automatically.

For the guided page and end-user instructions, see [Connection setup](../docs/connection-guide.md). The browser start screen offers a per-method guide before requesting a connection.

## Local setup

Build the modular app first (`npm run build` from the repository root). Install Python 3.11 or newer, then run from the repository root:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r Connection_Server/requirements.txt
.venv/bin/python Connection_Server/server.py
```

On Windows use `.venv\Scripts\python.exe` instead of `.venv/bin/python`.

Open `http://127.0.0.1:8765/`, then Options → Connection. Open a second browser/device, select Create pairing code on the host, and paste its code or scan its QR on the other device. Compare verification codes and approve on both screens. The main tab must separately grant remote control or live-result permissions.

## Phone / second computer / HTTPS

`127.0.0.1` always means the device you are using. A phone cannot reach your computer using that address. For LAN use, bind to an interface reachable by the phone and use a trusted HTTPS certificate for the hostname you open on both devices:

```sh
CONNECTION_HOST=0.0.0.0 CONNECTION_TLS_CERT=/path/to/cert.pem CONNECTION_TLS_KEY=/path/to/key.pem .venv/bin/python Connection_Server/server.py
```

The default signaling URL is generated from the page address when using this helper; github.io pages require an explicitly configured WSS endpoint. HTTPS uses WSS automatically. An HTTP LAN page may permit some WebRTC functionality, but SHA-256 transfers, camera, Bluetooth and USB may be unavailable; use trusted HTTPS. Opening the pages directly from disk also supports manual offer/answer pairing in supporting browsers. Keep the two generated offline HTML files together. A file-based QR link is not portable to another device; open the hosted page there and paste the pairing code instead.

Same-origin requests are accepted. To explicitly permit a separately hosted Connection page, set `CONNECTION_ALLOWED_ORIGINS` to a comma-separated list of exact origins. To allow a local file page to use this helper, explicitly include `null` (opaque file origins) and keep the helper bound to loopback. Do not put an unauthenticated signaling helper on a public network without TLS, origin restrictions, deployment rate limits and access controls appropriate to your environment. Room codes are bearer invitations, expire after 5 minutes, permit two participants, and are not written to access logs. The page never connects from a QR link automatically.

## Networks & transports

Manual pairing needs no signaling service. Devices on separate or restrictive networks may require STUN and a TURN relay. Enter your own ICE server configuration under Manual pairing → Network configuration before pairing. No public STUN/TURN service or account is bundled. TURN relays encrypted WebRTC traffic and is separate from this helper.

WebSocket client, Bluetooth BLE GATT and WebUSB are independent panels. Bluetooth/USB need browser support, an appropriate device, permission and documented service/characteristic or interface/endpoint information. They do not create general browser-to-browser Bluetooth/USB links. Writes occur only when you press Write once. No commands are replayed on reconnect.

## Session behavior

One peer, one inbound/outbound file each, 32 MiB per file, 64 MiB received-file memory cap, 64 KiB text, 4,000-character messages. Recipients approve each offer; SHA-256 must match before a file becomes downloadable. Downloads stay in memory until cleared. Disconnect revokes peer and main-tab permissions and clears session messages/downloads. Closing the main or Connection tab revokes its bridge. WebSocket and hardware panels have separate Disconnect controls; closing the Connection page disconnects all transports.

The original app, including offline OCR, is preserved. Its only additions are the Options → Connection button and a small approval-based tab bridge. The helper serves `dist/` by default, or `CONNECTION_STATIC_ROOT` if configured. Hosted Connection modules load QR libraries from the same site only when needed. The standalone offline Connection artifact embeds them.
