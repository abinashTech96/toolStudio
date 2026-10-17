# Connection page third-party notices

The Connection page reuses the QR encoder and decoder already bundled in Calc Studio. Their algorithms are unchanged. The hosted page loads local ES modules on demand; the standalone offline build embeds the factories. The application-specific UI, pairing protocol and transports are new additions.

- node-qrcode: https://github.com/soldair/node-qrcode — MIT, Copyright (c) 2012 Ryan Day. See `LICENSE-qrcode.txt`.
- jsQR: https://github.com/cozmo/jsQR — Apache License 2.0. See `LICENSE-Apache-2.0.txt`.
- aiohttp is an optional separately installed server dependency; its own distribution retains its licenses. It is not bundled into the HTML or ZIP.

Existing Calc Studio libraries and OCR assets remain unchanged.
