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

The native loopback tests pair Chromium with Chromium, Firefox with Firefox, and WebKit with Chromium. The WebKit runner cannot resolve its exchanged `.local` candidates reliably; the Chromium counterpart exposes a direct route inside the CI host. Both engines retain real peer connections, dual approvals, two-way messages and reviewed PNG downloads in both directions. No public STUN/TURN server or mocked peer transport is used. This fixture does not certify WebKit-to-WebKit pairing on every network.

## If Connecting returns to a failure (v45.0.1)

A failed attempt now keeps a **Connection failed** card instead of silently restarting setup. Select **Copy connection report** on each device before refreshing. The preview shows the build, failed stage and state transitions without pairing text, network addresses or shared content. **Export redacted diagnostics** in Advanced → Connection health includes this report too. Copying/exporting contacts no server. Reports last only in the current page; a fresh attempt or Disconnect clears them.

Use **Start fresh pairing** only when ready to exchange new details. The report describes the failed stage; it does not automatically prove that a phone setting or network caused it. The Connection header shows the build so both devices can be checked after an update.

## Connection QR exchange (v46)

The default manual pairing flow supports QR exchange for the same offer/answer JSON. It needs no additional account or pairing server. The two devices still need a working network path; use the same Wi-Fi or a permitted hotspot for the simplest setup. This feature does not claim to fix the separately reported Moto-started ICE failure.

1. First device: **Create connection details → Show connection QR**.
2. Second device: **Scan connection QR** beside Use pasted details. Allow camera access, or choose a saved QR image.
3. Review the decoded offer JSON in the popup. **Insert** fills the pairing field. Cancel preserves the current field. Insertion does not create a peer or approve a connection.
4. Second device: **Generate answer QR** becomes enabled when a valid offer is inserted or pasted. It creates the second device’s own answer and displays its QR. Use pasted details also retains the existing manual answer path; Show connection QR can display that answer.
5. First device: **Scan connection QR**, review the answer and **Insert**, then **Use pasted details**.
6. Compare verification codes and approve on both screens. Test a message and small PNG in both directions.

Large details are compacted locally. If multiple numbered QR codes are shown, use Next QR and scan every part. The scanner tracks distinct parts and checks the assembled payload before preview. A different set of QR parts requires Reset scan progress. A browser without compact-data decoding can retain copy/paste and the pairing-file alternative.

Camera tracks stop on cancellation, completion, hidden pages, session changes, navigation, core approval review and page exit. Hidden pages require an explicit Start camera action to resume. A late permission grant is released if its scan was cancelled. Scanned links and unrelated/incorrect-role QR data are rejected; no scanned URL is opened. Pairing details remain in page memory and are not saved as a new profile or sent to an external service. Existing file review, permissions, hashes, disconnect and failure reports remain in place.
