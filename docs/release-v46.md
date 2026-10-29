# v46 — Connection QR exchange

Manual pairing previously required moving offer and answer JSON between devices through text or files. First devices now show a QR for their current offer. Second devices scan through the camera or a saved QR image, review the full JSON, explicitly insert it, and choose Generate answer QR. First devices review and insert the scanned answer before using it. Both verification approvals remain required.

The existing local QR engines are reused. Larger JSON is compacted using browser compression and may use numbered QR parts with bounded collection and SHA-256 assembly checks. Raw JSON QR and uncompressed multipart remain supported. No cloud pairing service, app dependency or new theme is added. The same QR capability is bundled into the standalone companion.

Copy/paste, JSON files, server code/link pairing, WebSocket and USB controls remain. QR changes signaling exchange, not network reachability. The physical Moto-started failure remains a separate investigation; this release does not claim a fix for that direction.

Regression scope includes exact offer/answer round trips, malformed/oversized/compressed input, multipart integrity, image decoding, explicit Insert, wrong-role rejection, disabled/enabled actions, stale session/input handling, camera permission/cancellation/release, responsive layout, accessibility in both existing Connection themes and standalone operation. Separate native browser cases pair through actual QR images, require both approvals and verify a message and reviewed PNG. Whole-project regression retains the existing 84 workspaces, 139 routes and six themes. Physical phone camera certification is not claimed.
