# v50 — reviewed API work and clearer multiplayer

See v50-scope.md for all 50 accepted goals, what already existed and what changed. All 84 workspaces, 139 routes, 15 games, six themes and existing save/project formats are retained.

New API controls provide Simple/Advanced view, bounded response exploration, copied JSON paths/values, reviewed assertion insertion, cloned negative test scenarios, Composite/Graph request editing, schema-impact comparisons and supplied Salesforce error explanations. They never send automatically. Strict JSON parsing rejects duplicate keys and numbers that would silently lose precision. Composite edits preserve unsupported/unknown fields; local checks do not certify live Salesforce metadata or limits. Sources: https://developer.salesforce.com/docs/platform/api-rest/guide/resources-composite-graph.html and https://developer.salesforce.com/docs/platform/api-rest/guide/errorcodes.html .

Games invitations choose the starting player and an optional 30/60/120-second turn timer. Seat assignment is independent of the authoritative host. Seats and score remain stable during a series. Timer expiry loses the match; simultaneous RPS remains untimed. The host uses a monotonic clock and pauses it for disconnected/hidden pages, draw/invitation review and Memory’s automatic close. A retained turn shares its remaining allowance. Reloading loses page-memory recovery. Both players must use v50.

Tic-tac-toe, Connect Four and Reversi highlight the most recently recorded placed piece and offer a read-only review of public positions after completion. Review history is bounded and page-local; restored terminal saves may have only one position. Ludo additionally marks the last moved token or home area and names its colour/token number. It does not reveal Memory decks, private RPS choices or alter scores.

Home can restore this tab’s recorded view position/control without duplicating entered values. Resume builder has optional guided section navigation. JSON tree search reaches indexed leaves beyond the first preview. Image comparison displays the two chosen raster files and their real dimensions/byte sizes, with input-change/cancel cleanup. Existing export verification, redaction proof, row lineage, recovery, workflows and pane controls are reused.

Physical Android camera/network/screen-lock qualification is pending; follow v50-device-qualification.md and keep that evidence separate from automated tests.

Native WebKit regression exposed an initial-greeting timeout after reconnecting. The shared Connection handshake now repeats the same greeting at most eight times over 3.5 seconds, stopping on approval, close, cancellation or replacement. Duplicate greeting validation still prevents repeated approval prompts. This repairs a handshake gap; it does not establish that a phone/router network-path failure is fixed.
