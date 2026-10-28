# Connection — guided sharing (v45)

Open ToolStudio → Options → Connection. Choose **Connect another phone or computer** for messages, photos and files. This is the main task. **Advanced connections** reveals WebSocket and USB hardware. The Advanced navigation retains these panels plus Remote, Connection health and Protocol Studio. Messages is now a primary tab.

Bluetooth was removed as requested. Ordinary browser tabs did not provide phone-to-phone Bluetooth sharing. This removal is a product decision; BLE hardware does not inherently require a third-party app.

## Copy & paste: two phones, no pairing server

1. Open Connection on both devices, using a supported browser on HTTPS. For the simplest setup, use the same Wi-Fi or a permitted hotspot. The devices need a working network path.
2. Choose **First device · start here** on one and **Second device · join** on the other. **Copy & paste · no pairing server** is the default.
3. On the first device choose **Create connection details**. When ready, choose **Copy connection details** and send the text directly to the second device using a trusted channel.
4. On the second device paste it into **Pairing details from the other device**, then choose **Use pasted details**. Copy the generated answer and send it back to the first device.
5. On the first device paste the answer into **Pairing details from the other device**, then choose **Use pasted details**.
6. Compare verification codes. Approve on both screens only if the codes match and identify the intended device.
7. Both approvals unlock **Send message**, **Send photo** and **Send file**. These shortcuts open the composer or file input; they do not send automatically. Messages also has a primary navigation tab.

The current step explains who must act next. The first device’s paste field appears after it has an offer. The second device sees its answer and copy controls after importing an offer. Pairing JSON files remain an alternative to pasting. Invalid/incomplete JSON gives an actionable message. Overlapping pairing actions are blocked; starting a fresh offer over a current session requires review.

**Device name, permissions & session** contains your editable device name, verification code, permissions and Disconnect & revoke. Disconnect clears session messages/downloads and revokes peer/main-tab permissions. Keep both pages open: refreshing requires a fresh pairing.

Pairing text includes network addresses; exchange it directly with the intended recipient. Manual exchange replaces a signaling server, not network connectivity. Network isolation, firewalls or different networks may require separately configured STUN/TURN. No public ICE relay is bundled.

## Optional code and QR pairing

Select **Pairing code · server required** in Pairing method. Use the same reachable signaling server on both devices. GitHub Pages does not supply one. First device creates the 24-character code; the other enters it and chooses Join. Codes expire after five minutes. A pairing link/QR loads the server and Join setup but never joins automatically. Both users still verify and approve.

See [the helper’s TLS, origin and LAN setup](../Connection_Server/README.md). `127.0.0.1` on a phone means that phone, not your computer. HTTPS pages require WSS.

## Advanced connections

| Panel | Purpose | Requirements |
| --- | --- | --- |
| WebSocket | Send/receive text or bytes with a server | A reachable WS/WSS endpoint accepting this browser’s origin and authentication; HTTPS requires WSS |
| USB hardware | Read/write a documented bulk/interrupt interface | WebUSB, compatible hardware, data cable and documented vendor/product/interface/endpoints; phone-to-phone cable sharing is not implemented |
| Protocol Studio | Build/decode packets and explicitly review one replay | An established USB or WebSocket transport; payload capture remains opt-in |
| Connection health | Peer latency/routing and redacted session trace | An approved peer for latency; no hardware permission is requested by viewing checks |
| Remote | Supported tool controls and text result display | Peer permission and separate main-tab bridge approval |

USB retains validated endpoints, explicit writes, release on disconnect and operation deadlines. Device profiles live on the USB page. Saved USB profiles remain available when old storage also contains Bluetooth profiles; loading does not rewrite saved storage. A later explicit save/delete writes the retained profiles.

WebSocket shows **Open** only after its connection opens. Enter a payload, select text/hex encoding, then choose **Send once**. Sent and Received entries appear below the buttons. A server does not necessarily echo; check its protocol. No public endpoint is built in or contacted automatically, and no automatic reconnect or resend occurs.

## Sharing permissions and limits

Recipient review, file cancellation and SHA-256 checks remain. Maximum 32 MiB per file, one incoming and outgoing file at a time, and 64 MiB received-file memory. Text offers are limited to 64 KiB and messages to 4,000 characters. Disconnect clears held downloads/messages. Main-tool import, remote control and result sharing retain separate approval. Other tools and their routes are unchanged.

## Offline and validation

The standalone Connection companion embeds the same guided sharing, retained transports and five guides. Keep it beside the main offline HTML for the Options launcher. Reading guides works offline; real sharing still needs a network path.

Tests cover roles, offer/answer copy, both approvals, real peer messages, reviewed PNG/text transfer, integrity/downloads, disconnect, server-link setup, live loopback WebSocket echo, simulated USB validation/deadlines/profiles, migration, responsive layouts, accessibility and standalone output. CI runs the Connection tests in Chromium, Firefox and WebKit as well as whole-project regression. Physical USB certification is not claimed.
