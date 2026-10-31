# ToolStudio v50 — implementation and verification map

Baseline: main c2d531e0cb4f0650ba550bbb2ed2de6dd0102ef1 (merged v49). The 50 accepted goals were audited against existing behavior. Existing implementations are retained and verified instead of adding duplicate controls or replacing compatible save formats. New or improved behavior is identified explicitly below.

The earlier seven Games and six Integration Studio backlog entries map to goals 11–18 and 21–28. Physical phone work cannot be completed by browser automation. No Bluetooth functionality is reintroduced. No new server, dependency or theme is added.

| Goal | Improvement | Delivery | Main source | Validation |
| --- | --- | --- | --- | --- |
| 01 | Compact controls | Fixed selection actions squeezing editor width; collapsed below the editor | `src/shared/styles/workspace.css` | test:pdf-ui |
| 02 | Consistent action order | Retained | `src/core/workspace-ui.js` | test:pdf-ui |
| 03 | Searchable dropdowns | Improved: search from 12 choices; Enter accepts a sole match; caption CSS excludes picker wrappers | `src/core/workspace-ui.js` | test:v50; test:pdf-ui |
| 04 | Adjustable editor/result panes | Improved: spoken width and complete reset | `src/core/workspace-ui.js` | test:pdf-ui; test:v40 |
| 05 | Clear keyboard focus | Retained | `src/shared/styles/workspace.css` | test:pdf-ui |
| 06 | Task shortcuts | Retained | `src/core/home-extras.js` | test:home-extras |
| 07 | Resume previous work | Improved: tab-local position and control ID; no input copies | `src/core/home-resume.js` | test:v50; test:home-extras |
| 08 | Grouped search previews | Retained | `src/core/home.js` | test:home-redesign |
| 09 | Feature pinning | Retained | `src/core/home.js` | test:home-redesign |
| 10 | Compact dashboard | Retained | `src/shared/styles/homeStyles.css` | test:home-redesign |
| 11 | Compact mobile game screen | Improved | `src/games/styles.css` | test:remote-games; test:play-setup |
| 12 | Last-move highlighting | Added for Tic-tac-toe, Connect Four and Reversi | `src/games/board-review.js` | test:v50; test:remote-games |
| 13 | Simple game instructions | Retained for all 15 games with controls/mode text | `src/games/app.js` | test:games; test:play-setup |
| 14 | Starting-player choice | Added to remote invitations; series seats stay consistent | `src/games/remote-session.js` | test:v50; test:remote-games |
| 15 | Optional turn timer | Added to remote turn-based games; off by default; excludes simultaneous RPS | `src/games/turn-clock.js` | test:v50; test:remote-games |
| 16 | Completed-match review | Added for three public board games, recorded in this page only | `src/games/board-review.js` | test:v50; test:remote-games |
| 17 | Moto/Vivo pairing directions | Manual qualification pending; checklist and redacted reporting retained | `docs/v50-device-qualification.md` | Physical phones required |
| 18 | Background and screen-lock behavior | Automated visibility/clock checks added; physical lock qualification pending | `src/games/remote-session.js` | test:v50; test:remote-games; manual |
| 19 | Clear connection failures | Retained guided failure/retry diagnostics; game pause text improved | `src/connections/peer-diagnostics.js` | test:connection; test:remote-games |
| 20 | Mode/difficulty consistency | Retained 15 local/solo modes and six direct remote games | `src/games/local-play.js` | test:play-setup; test:remote-games |
| 21 | Simple/Advanced API view | Added without moving or replacing original fields | `src/release50/developer-ui.js` | test:v50 |
| 22 | Response explorer | Added bounded filtering, exact paths, values and reviewed assertions | `src/release50/developer-ui.js` | test:v50 |
| 23 | Salesforce error explanations | Added, retaining raw supplied messages and references | `src/release50/developer.js` | test:v50 |
| 24 | Resolved-variable preview | Retained current collection preflight; no sends | `src/release40/algorithms.js` | test:v40 |
| 25 | Request/response focus layout | Retained existing pane controls alongside Simple view | `src/core/workspace-ui.js` | test:pdf-ui; test:v50 |
| 26 | Visual Composite Graph editor | Added local editable nodes, dependencies and unknown-field preservation | `src/release50/developer-ui.js` | test:v50 |
| 27 | Guided test-case builder | Added review and append; no auto-send | `src/release50/developer-ui.js` | test:v50 |
| 28 | Contract comparison | Added field-impact report for supplied schemas/OpenAPI JSON | `src/release50/developer.js` | test:v50 |
| 29 | Collection dependency preflight | Retained existing independent dry run | `src/release40/algorithms.js` | test:v40 |
| 30 | Readable assertion reports | Retained actual/expected/pass results; explorer prepares exact assertions | `src/advanced/enhancements/developer.js` | test:workflows; test:v50 |
| 31 | Guided resume editing | Added compact optional navigation through real editor sections | `src/career/app.js` | test:v50; test:career |
| 32 | Job-specific variants | Retained existing independent content and master review | `src/career/model.js` | test:career; test:v40 |
| 33 | Custom resume alignment | Retained per-section geometry | `src/career/layout.js` | test:career; test:pdf-ui |
| 34 | Page-break preview | Retained existing preview/export shared geometry | `src/career/documents.js` | test:career; test:pdf-ui |
| 35 | Exported-text verification | Retained actual PDF/Word extraction checks | `src/career/documents.js` | test:v40; test:pdf-ui |
| 36 | Original/export image comparison | Added side-by-side selected-file review with dimensions/bytes | `src/release50/media-ui.js` | test:v50 |
| 37 | Batch queue visibility | Retained per-job status, retry and cancellation | `src/workflows/image-batch.js` | test:workflows; test:v40 |
| 38 | Page OCR review | Retained approval per region and preservation of outside edits | `src/release40/media.js` | test:v40 |
| 39 | Export size/quality review | Retained encoding previews; added actual selected-export byte comparison; no quality score | `src/release50/media-ui.js` | test:v50; test:v40 |
| 40 | Redaction verification | Retained opaque pixel checks against actual raster exports | `src/release40/media.js` | test:v40 |
| 41 | JSON field navigation | Improved: search every indexed leaf beyond first 1,000 results | `src/advanced/enhancements/data.js` | test:v50; test:advanced |
| 42 | Transformation previews | Retained explicit preview/apply and stale-result guards | `src/advanced/enhancements/data.js` | test:advanced; test:workflows |
| 43 | Source-row tracing | Retained complete join/pivot lineage | `src/workflows/lineage.js` | test:v40 |
| 44 | Field-level difference review | Retained current three-way review and conflicts | `src/advanced/enhancements/data.js` | test:advanced; test:v39 |
| 45 | Large-file responsiveness | Retained workers, stream profiles and paginated previews; limits unchanged | `src/advanced/ui.js` | test:reliability; test:budgets |
| 46 | Cached-session upgrades | Retained guarded worker activation and prior lazy assets | `src/core/service-worker.js` | test:updates |
| 47 | Damaged-save recovery | Retained original-byte download, validation and reviewed replacement | `src/advanced/storage.js` | test:reliability; test:v39 |
| 48 | Cancellation and Undo | Retained native transaction paths; new reviews invalidate stale candidates and clean up resources | `src/advanced/ui.js` | test:workflows; test:v50 |
| 49 | Routes and deep links | Retained all 139 routes, including 105 legacy paths | `scripts/route-coverage.mjs` | test:coverage; npm run check |
| 50 | Browser/offline regression | Extended existing matrix and regression with v50 checks | `scripts/regression.mjs` | test:regression; all four CI jobs |

Validation status is recorded in the PR for its exact head commit. A source/behavior audit does not itself certify a test pass. Physical goals 17–18 remain awaiting real Android evidence, even after all automated jobs pass.
