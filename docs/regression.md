# Edition 34 regression — 17 October 2026

The final hosted and offline builds passed the following checks. No existing tool was removed.

| Validation | Result |
| --- | --- |
| Existing regression suite | 35 suites, 11,411 checks; no failures or page errors |
| Hosted project-path and offline browser suite | 151 checks; no browser errors |
| Connection protocol and responsive UI | 86 checks |
| Bluetooth/USB adapter mocks | 20 checks |
| Tab bridge and native ICE timeout handling | 8 checks |
| Optional static/signaling server | 13 checks |
| Build | 11 categories, 68 workspaces, 81 source modules, 123 routes |
| New algorithm/state checks | 62 checks |
| New workspace/enhancement browser checks | 43 checks, including accessibility, storage failure, reset and packet capture |
| Performance budgets | 7 checks |
| OCR integrity | All 3 original binary/model hashes verified |

The original suites cover navigation, responsive controls, all six themes, fullscreen exit, reset/backup scopes, deferred DOM rendering, text/data processing, camera editing, PDF/media exports, career documents, forms and Kanban. Fixtures were regenerated from the modular offline build. Their file paths and function-scope hooks were adapted for the migration. Inventory assertions were updated for 123 routes, 68 workspaces and 11 categories. Inactive-interface assertions now expect 67 parked workspaces. Original route and runtime behavior checks remain intact. Connection hosted readiness waits for native installation before reading the complete registry.

Hosted checks exercise every route under `/toolStudio/`, confirm that no OCR/vendor engines download during initial startup, and run QR/barcode generation, PDF/archive/spreadsheet round trips and Markdown worker rendering. A generated image containing `STUDIO 123` is recognized through the actual on-demand OCR button. The suite also tests saved layout preferences, mobile controls, Normal view, Connection redirect/bridge authentication, service-worker-controlled offline reload and both raw and packed standalone offline files, including a SQLite query from the packed file.

The checked-in `npm test` and `npm run test:compatibility` provide repeatable hosted/offline checks plus the engine, workflow, media, document, edge and mocked-hardware regression subset. The optional Python server suite runs with `python3 tests/server.py` after installing `Connection_Server/requirements.txt`. Full original-suite and new-suite summaries are recorded in [regression-results.json](regression-results.json).

## Limits

Bluetooth/USB tests use explicit simulated devices; no physical hardware was connected. The runtime cannot gather native WebRTC ICE candidates, so data-channel protocol checks use an explicit WebRTC test interface. Local WebSocket echo and room signaling were exercised against real local servers; native ICE failure/cleanup was tested separately. Cross-network WebRTC, TURN deployment and platform-specific TV remote keys still need real-device verification.

Hosted offline support covers the shell and previously loaded optional assets. The standalone offline file embeds all engines and models. Application initialization still loads the category chunks at startup; the large third-party engines and OCR resources load on demand. Migrated workspaces retain shared dependencies, as described in [architecture.md](architecture.md).


Edition 34 checks exercise all 18 new workspaces and existing-tool advanced panels: actual SQL WASM and PDF rendering/editing, schema validation, migration ZIPs, sanitized SVG, portfolio HTML, reviewed API chains, data pivots/merges, graph fits, image Undo, packet encoding/capture and saved-state recovery. Accessibility covers a representative native workspace with no critical/serious axe violations; it is not a certification of every browser or assistive technology. The final graph-rendering timing fix and native layout-restore/navigation-capacity fixes were checked again with the repeatable browser/compatibility suites after the full original-suite run.

CI on a fresh Chromium runner exposed delayed rendering of conflict choices. Result widgets now render synchronously with their report through a shared after-report hook; conflict export remains blocked until every choice is resolved. The browser suite checks that both conflict controls exist before resolving them.
