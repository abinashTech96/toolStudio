# Connection — guided setup (v35.03)

Open Tool Studio → Options → Connection. The start screen asks what you want to connect:

| Choice | Purpose | Requirements |
| --- | --- | --- |
| Phone or computer | Review and share text, files, photos, supported text results and remote actions between two browsers | A working network path, supported WebRTC/secure cryptography and either a pairing server or manual offer/answer exchange |
| Bluetooth device | Read/write a documented BLE GATT characteristic | A browser exposing Web Bluetooth, secure context, a compatible advertising BLE peripheral and its service/characteristic |
| USB hardware | Operate a documented browser-accessible USB interface | WebUSB support, a suitable data cable and documented IDs/interface/endpoints |
| WebSocket server | Send/receive text or bytes with a server endpoint | A reachable endpoint accepting the browser origin and supported authentication |

API availability is checked without connecting or opening a permission prompt. It does not establish that the Bluetooth radio is on, a USB device is compatible, or the network is reachable.

## Read first, then connect

Each method has a Read guide action. How to connect in the header opens the selected method’s guide. Guides contain:

1. What the method does and what it needs.
2. Five numbered setup steps using the visible button names.
3. What successful connection looks like.
4. Troubleshooting with specific next actions.
5. Go to setup, which reveals and focuses the relevant controls without connecting.

Additional guides cover manual pairing and post-pairing workflows. More tools retains Session messages, WebSocket, Bluetooth, USB, Connection health and Protocol Studio. Four primary tabs are Connect, Send & receive, Remote and Guides.

### Phone/computer over Wi-Fi or network

Join the network in the operating system. Being on the same Wi-Fi is not sufficient to pair browsers.

For pairing codes, both screens must use the same running pairing server. Create the 24-character code on A, join on B, compare verification codes and approve on both screens. A QR/pairing link loads the setup but never joins automatically. Codes expire after five minutes.

GitHub Pages does not run the signaling helper. Use the address supplied by the host or run the helper described below. Different or restrictive networks may need separately configured STUN/TURN; no public relay is bundled.

Without a server, use Advanced / manual pairing: A creates an offer, B imports it and creates an answer, A imports B’s answer, then both users verify and approve. Exchange pairing data only through a trusted channel.

### Bluetooth

Battery level and Device manufacturer presets fill standard BLE names for read examples. They are not universal device profiles. Custom exposes the documented service/characteristic fields. Changing a profile disconnects the existing BLE connection so its operations cannot be confused with a new profile.

Choose device & connect requests the browser permission picker. Read is enabled only after a readable characteristic connects. Notifications and payload writes remain under Advanced controls and depend on actual characteristic properties.

This is not ordinary browser-to-browser phone/laptop Bluetooth pairing, Bluetooth audio or a generic Bluetooth Classic driver.

### USB

Vendor/Product identifiers appear first. Device interface settings contains configuration, interface, alternate, endpoints and read length; confirm these from hardware documentation before connecting. Defaults are examples.

Read/write actions require an open device. The existing endpoint validation, explicit writes, cancellation and ten-second read timeout remain. A compatible browser does not make every USB device/interface accessible.

### WebSocket

Enter the endpoint supplied by its owner; an HTTPS page requires wss://. Connect does not send the payload. Send once is explicit. Subprotocols are under Optional subprotocol settings. The browser API cannot add arbitrary authentication headers, and a server need not echo messages.

## Use a connected tool

The post-pairing guide explains text/JSON review into supported destinations, photo review into Camera & Image Studio, verified file downloads, supported text-result display and supported remote controls. These capabilities require their existing peer permissions and separate main-tab bridge review.

Other file types are downloaded for manual import. BLE/USB/WebSocket consoles do not automatically control every Tool Studio tool.

## Optional helper on a computer

Install Node 22.13+ and Python 3.11+, obtain the repository, and run from its root:

    npm ci
    npm run build
    python3 -m venv .venv

Windows:

    .venv\Scripts\python.exe -m pip install -r Connection_Server/requirements.txt
    .venv\Scripts\python.exe Connection_Server/server.py

macOS / Linux:

    .venv/bin/python -m pip install -r Connection_Server/requirements.txt
    .venv/bin/python Connection_Server/server.py

Open http://127.0.0.1:8765/ on the hosting computer, then Options → Connection. The helper fills its own pairing-server address.

127.0.0.1 on a phone refers to the phone, not the computer. A second physical device needs a reachable hostname/address with trusted HTTPS/WSS for full support. Follow [the helper’s TLS, origin and LAN setup](../Connection_Server/README.md). An independently hosted GitHub Pages Connection page also needs its origin allowed by the helper. This requires configuration by the host; the browser page does not create a hosted service.

## Offline and validation

The offline Connection companion embeds the same chooser, guides and adapters. Keep it beside the main offline HTML for the Options launcher. Reading guides needs no network; actual connections still need their relevant transport.

The regression suite retains simulated BLE/USB checks and adds guided UI, browser support, hosted clipboard, QR setup, responsive/accessibility, offline and real two-browser pairing/review checks. Physical hardware certification is not claimed. A local environment without usable ICE interfaces may explicitly skip real network tests; GitHub CI runs those tests without that skip.
