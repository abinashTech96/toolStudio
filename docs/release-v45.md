# v45 — Guided Connections

Connection now leads with phone/computer sharing. First device / Second device roles, progressive copy/paste controls and a next-action status replace the hidden manual-pairing path. Both explicit approvals unlock message/photo/file shortcuts. Messages is a primary tab. Code/QR pairing, permissions, disconnect, supported remote actions, protocol tools and diagnostics remain available.

WebSocket and USB hardware are grouped under Advanced connections. USB clearly explains that phone-to-phone cable sharing is not implemented. Bluetooth controls, adapter, guides, capability checks, replay targets and simulator choice were removed as agreed. Existing USB profiles are retained when loading mixed legacy profile storage; no load-time storage rewrite occurs.

The standalone companion and GitHub Pages output are generated from the same source. No dependency or theme was added. The existing 84 workspaces, 139 routes and six themes remain.

Validation is recorded in GitHub Actions and test-results. See [Connection guide](connection-guide.md) for setup, supported behavior and limits.

Native Connection coverage uses same-engine Chromium/Firefox peers and a real Chromium counterpart for WebKit, whose Linux runner cannot resolve exchanged mDNS host candidates. Both approval screens, bidirectional messages, reviewed PNG transfer/download in both directions and revocation remain asserted; no peer protocol is mocked or skipped in CI.

The peer handshake now also starts for channels already open when their handlers are installed. An idempotent guard prevents duplicate initial greetings and ignores stale/closed channels.

New peers request one greeting acknowledgement to cover a greeting sent before the remote receiver is ready. Matching repeated greetings are idempotent; changed nonce/name or malformed flags are rejected. Legacy v1 peers remain accepted without unsolicited acknowledgements. Queued messages from a disconnected channel are discarded. Approval is never automatic.

A native browser regression deliberately drops the first greeting from each side in turn. Both sessions must still verify, require both approvals once, and disconnect cleanly.
