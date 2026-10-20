# Recovered Home and navigation validation — 20 October 2026

Recovered the saved homepage checkpoint and restored registry-based menus, shared-service extraction, compressed original helper sources, consistent workspace controls and expanded navigation/accessibility checks. The earlier lost checkout's results were not treated as validation for this recovery.

Fresh local Chromium validation passes **581 checks**: 151 smoke, 28 homepage, 12 architecture, 6 navigation, 62 advanced unit, 43 advanced browser, 24 reliability unit, 20 reliability browser, 5 service-worker update, 210 compatibility, 13 Connection-server and 7 build-budget checks. Source/published output, original OCR hashes and exact baseline inventory comparisons also pass. All 68 workspace IDs and all 123 route IDs are retained. No tool was deleted.

The regression covers hosted/project-path operation, exact feature search, native and legacy deep links, browser history, optional tools, saved-work menus, source retention, representative accessibility, media/document engines, real OCR recognition, request workflows, cancellation, recovery, connection adapters, cached offline reload, standalone offline startup and standalone SQLite queries. Hardware mocks do not certify physical Bluetooth/USB devices.

The GitHub workflow runs shared reliability checks in Chromium, Firefox and WebKit. Local fresh runs used Chromium; this report does not claim fresh local Firefox/WebKit runs. The complete local result summary is retained in `recovery-validation.json`.

The hosted runtime JavaScript is approximately 2.40 MB, versus approximately 3.66 MB before these changes; the compressed helper resource is an additional approximately 346 KB. This reduces parsed JavaScript without claiming faster total readiness on every device. The standalone build still embeds all original helper sources and engines.

Reproduce with `npm run publish:root`, `npm run check`, `npm test`, `npm run test:home`, `npm run test:navigation`, `npm run test:advanced`, `npm run test:reliability`, `npm run test:updates`, `npm run test:compatibility`, `npm run test:budgets`, `python3 tests/server.py` and `node scripts/check.mjs --published`.
