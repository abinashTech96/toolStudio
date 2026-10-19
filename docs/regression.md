# Edition 35 regression — 19 October 2026

No existing tool was removed. The topbar and original OCR assets remain. The build retains 11 categories, 68 workspaces, 81 source modules and all 123 routes, including the 105 original routes.

| Validation | Local result |
| --- | --- |
| Hosted/project-path and standalone offline smoke suite | 151 checks |
| Existing advanced algorithms/state | 62 checks |
| Existing native workspaces and enhancements | 43 checks |
| Retained functional compatibility suites | 210 checks across engines, workflows, media, documents, edge cases and hardware mocks |
| New accuracy/storage unit checks | 24 checks |
| New reliability browser checks | 19 Chromium checks |
| Two-version service-worker upgrade | 5 checks |
| Build/performance budgets | 7 checks |
| Optional Connection server | 13 checks |
| Source/published output validation | Syntax, asset references, original OCR hashes, full route inventory and reproducible published output |

The new browser tests exercise unsafe integers, duplicate query columns, SQL database reuse and cancellation/retry, complete CSV exports, search/page jumps, stale async previews, declined Apply, missing/null Workbench values, typed POST bodies, navigation cancellation, workspace release, canonical alias tabs, mobile/landscape/TV viewport bounds, deferred schema loading, bounded histories/writes, cross-tab conflicts and corrupt-record recovery. Chromium also checks typing under 4× CPU throttling and heap growth after repeated navigation with garbage collection.

The validation workflow runs the shared reliability checks in Chromium, Firefox and WebKit. CI output is authoritative for those browser runs; local validation uses Chromium. Physical phones/TVs and real Bluetooth/USB devices are not certified by browser mocks or viewport emulation.

## Measured startup comparison

Three fresh local headless Chromium contexts per build, same environment and local server; baseline commit `5a2db5a`. Service workers were disabled for this measurement.

| Metric | Edition 34 median | Edition 35 median |
| --- | ---: | ---: |
| Application readiness | 420 ms | 520 ms |
| Longest startup task | 267 ms | 55 ms |
| Decoded startup JavaScript | 3,538,936 bytes | 3,492,648 bytes |

Cooperative initialization substantially reduced the longest blocking task; readiness was 100 ms later in this run. These timings describe this environment, rather than a device-wide speed guarantee. Raw runs are in `regression-results35.json` and can be reproduced with `npm run benchmark`.

See [edition 35 changes and limits](performance35.md), [edition 34 historical report](regression34.md) and the validation workflow artifacts for detailed results. Edition 34's historical 11,411-check report is retained separately; that entire historical harness is not claimed as a fresh edition 35 run.
