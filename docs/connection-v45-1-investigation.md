# Connection v45.0.1 — failed pairing investigation

Two Android Chrome devices previously exchanged messages and a PNG successfully. After v45, a fresh manual offer/answer exchange reached Connecting, then both devices showed Closed and the setup returned to its initial instructions. This reproduced on the same Wi-Fi and on a phone hotspot. The underlying device-to-device failure has not yet been reproduced or diagnosed from a physical-device report.

The v44 → v45 comparison found no change to ICE server defaults, offer/answer SDP serialization, or the native peer constructor. The update did change the guided UI and greeting handshake. These facts narrow the investigation; they do not exonerate v45 or prove a phone/network issue.

Confirmed defects fixed:

- Terminal native failures were passed directly to generic disconnect cleanup. Their connection, ICE and transport state disappeared, and the UI returned to the first step. A failure now stays visible with an explicit Start fresh pairing action.
- Answer import could report “verify and approve” before a channel had opened, or after an asynchronous operation lost its peer. It now identifies Connecting, checks that the original peer is current after awaits, and cannot overwrite a newer attempt with late success.
- An old verification digest could update identity and open a review after disconnect. It now checks the peer/channel before committing its result.
- No-candidate gathering could produce pairing details that could never establish a connection. It now stops with a report before copying unusable details.
- Answerer instructions could keep saying to send the answer while the transport was already connecting. Native Connecting takes precedence.

The failure card has Copy connection report and an expandable preview. Export redacted diagnostics also contains the last failure report. Reports retain build, timestamps, fixed state names and candidate counts/types, plus a bounded event history. They exclude raw SDP, addresses, ICE passwords/ufrags, certificates/fingerprints, device names and shared content. The report identifies the stage, not a proven underlying cause. No server is contacted by copying/exporting it. A fresh attempt, Disconnect, page refresh or closing the page clears the report. Reports are not saved in browser storage.

Both approvals, recipient review, permissions, content hashes and revocation remain required. No relay/server dependency, camera/microphone grant, security bypass, automatic reconnect or automatic approval was added.

Validation:

- The lifecycle test first failed against the previous v45 output, which silently reset after the injected native failure.
- Thirty unit checks and ten browser fault-injection scenarios cover failed-state retention, copy/report redaction, explicit retry, failure during answer import, stale answer/verification callbacks, no-candidate gathering and phone viewport sizing.
- The existing native peer scenarios remain separate. Fault injection is not a replacement for real RTC or Android certification.

After deployment, if Android pairing still fails, copy the connection report from each phone without refreshing. Those two reports are the next required evidence. It would be incorrect to claim this patch has already resolved the physical Android pairing failure.
