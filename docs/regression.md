# Modularization regression — 17 October 2026

The final hosted and offline builds passed the following checks. No existing tool was removed.

| Validation | Result |
| --- | --- |
| Existing regression suite | 35 suites, 11,161 checks; no failures or page errors |
| Hosted project-path and offline browser suite | 131 checks; no browser errors |
| Connection protocol and responsive UI | 86 checks |
| Bluetooth/USB adapter mocks | 20 checks |
| Tab bridge and native ICE timeout handling | 8 checks |
| Optional static/signaling server | 13 checks |
| Build | 8 categories, 50 workspaces, 63 source modules, 105 routes |
| OCR integrity | All 3 original binary/model hashes verified |

The original suites cover navigation, responsive controls, all six themes, fullscreen exit, reset/backup scopes, deferred DOM rendering, text/data processing, camera editing, PDF/media exports, career documents, forms and Kanban. Fixtures were regenerated from the modular offline build. Their file paths and function-scope hooks were adapted for the migration. One source-text assertion was updated to recognize the context-qualified route assignment; its runtime assertions remain intact.

Hosted checks exercise every route under `/toolStudio/`, confirm that no OCR/vendor engines download during initial startup, and run QR/barcode generation, PDF/archive/spreadsheet round trips and Markdown worker rendering. A generated image containing `STUDIO 123` is recognized through the actual on-demand OCR button. The suite also tests saved layout preferences, mobile controls, Normal view, Connection redirect/bridge authentication, service-worker-controlled offline reload and the standalone offline file.

The checked-in `npm test` and `npm run test:compatibility` provide repeatable hosted/offline checks plus the engine, workflow, media, document, edge and mocked-hardware regression subset. The optional Python server suite runs with `python3 tests/server.py` after installing `Connection_Server/requirements.txt`. Full original-suite and new-suite summaries are recorded in [regression-results.json](regression-results.json).

## Limits

Bluetooth/USB tests use explicit simulated devices; no physical hardware was connected. The runtime cannot gather native WebRTC ICE candidates, so data-channel protocol checks use an explicit WebRTC test interface. Local WebSocket echo and room signaling were exercised against real local servers; native ICE failure/cleanup was tested separately. Cross-network WebRTC, TURN deployment and platform-specific TV remote keys still need real-device verification.

Hosted offline support covers the shell and previously loaded optional assets. The standalone offline file embeds all engines and models. Application initialization still loads the category chunks at startup; the large third-party engines and OCR resources load on demand. Migrated workspaces retain shared dependencies, as described in [architecture.md](architecture.md).
