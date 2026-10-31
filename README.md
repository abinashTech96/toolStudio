# Tool Studio

Browser tools for calculation, data, development, files and professional documents.

**Live site:** https://abinashtech96.github.io/toolStudio/

The source is organized into **11 categories, 69 workspaces and 82 application modules**. All **105 existing tool routes** remain available alongside **19 new routes** (124 total). The topbar, saved data keys and reviewed Connection permissions are retained.

The root URL opens a searchable Home dashboard with category cards, favorites and recent tools. Search can open individual features such as SOQL or Loan / EMI. Use **Home** to return without clearing workspace inputs. Bookmarks using `#tool=<id>` still open the requested workspace; browser Back/Forward works between Home and tools. Both hosted and standalone offline builds include the dashboard.

## Build and run

Requires Node.js 22.13 or newer. Install the pinned build dependencies first. Runtime engines are bundled locally; no production CDN requests are required.

```sh
npm ci
npm run build
npm run serve
```

Open `http://127.0.0.1:4173/toolStudio/`. Use a web server for the modular site; ES modules cannot reliably run by double-clicking `index.html`.

For a self-contained file, open `dist/offline/Calc_Studio_Offline.html`. Keep `dist/offline/Calc_Studio_Connection.html` alongside it for Options → Connection. Both are generated from the same sources.

## Develop and publish

Edit `src/`, not generated root files. Then run:

```sh
npm ci
npx playwright install chromium
npm run build
npm run check
npm test
npm run test:home
npm run test:navigation
npm run test:advanced
npm run test:budgets
npm run test:compatibility
npm run publish:root
node scripts/check.mjs --published
```

Commit the source changes **and** generated root changes. GitHub Pages can continue serving **main / (root)** at `/toolStudio/`; no custom domain, production Node server or root-absolute asset paths are required. `dist/` is local build output and is ignored by git. `.generated-files.json` identifies the root files managed by the publisher and lets it remove outdated hashed chunks safely.

`CHROMIUM_PATH` can select an existing Chromium executable for tests. CI builds the app and runs browser and compatibility checks. A GitHub Pages branch deployment publishes the checked-in root files.

## Source map

| Location | Responsibility |
| --- | --- |
| `src/categories/<Category>/<Workspace>/` | Workspace logic, view fragments, local styles and module metadata |
| `src/advanced/` | Lazy native workspaces, existing-tool enhancements, worker jobs and validated local state |
| `src/core/` | Startup, navigation, settings, processing, device controls, resource loading and lifecycle |
| `src/shared/` | Shared engines, reusable components and application styles |
| `src/connections/` | Separate Connection page, guided peer sharing, signaling, WebSocket and USB adapters |
| `public/assets/` | Local OCR models and third-party engines |
| `public/guide.html` | Existing user guide |
| `Connection_Server/` | Optional Python static/signaling helper |
| `scripts/` | Deterministic build, validation, local server and Pages publisher |

Folder names supply display labels; `module.json` IDs and routes remain stable for saved state and links. See [architecture](docs/architecture.md) before moving modules or changing shared bindings.

## Loading and offline use

The hosted shell is approximately 269 KB, compared with the previous 13.7 MB HTML file. Application logic is split into ten compact startup chunks; OCR, PDF, spreadsheet, QR, barcode, archive and text-worker resources load when needed. Offline OCR is retained with SHA-256 checks on its original assets.

The scoped service worker caches the application shell and resources already used. A feature's optional engine must be loaded while online before that feature can work offline in the hosted app. The downloadable offline build embeds all engines and OCR data. Its published file is gzip-packed with a bundled JavaScript unpacker and opens without a server. Clear site data to remove downloaded caches; the existing tool reset controls continue managing tool/settings data.

## Connections

Options → Connection opens a separate tab. GitHub Pages serves static files and **does not host a WebSocket/signaling server**. Manual WebRTC pairing remains available; room-code pairing needs your configured HTTPS/WSS endpoint. See [Connection server setup](Connection_Server/README.md). USB requires a compatible browser and documented hardware interface. Automated adapter tests do not certify physical hardware or every TV browser.

See [edition 35 performance, accuracy and recovery](docs/performance35.md) for the latest existing-tool improvements and explicit limits.

See [edition 34 features](docs/features34.md) for the new workspaces, existing-tool improvements, limits and reviewed actions.

No existing tool or OCR functionality was removed. See [regression report](docs/regression.md) for validation and limits.

## Games and homepage update

Options → Games opens seven separate games with local coaching, difficulty controls, fullscreen/Exit and opt-in progress saving. See [Games guide](docs/games.md) and [v35.02 release behavior](docs/release-v35.02.md). Home includes the full Guide, version, reviewed file entry and saved-project review; update notices identify the installed and waiting versions.

Run npm run test:games, npm run test:home-extras and npm run test:updates along with the existing regression suites.

## Guided Connection setup

Options → Connection starts with phone/computer sharing and guided First device / Second device pairing. Copy/paste and Advanced → Connect via QR need no signaling server; code pairing requires a configured server. The QR view guides Create → Join/scan → scan reply automatically, without JSON or Insert steps. Both approvals remain required. After both approvals, Send message, Send photo and Send file open the existing sharing controls. WebSocket, USB and diagnostic tools remain under Advanced. Bluetooth was removed in v45. See [the Connection guide](docs/connection-guide.md). Run npm run test:connection alongside existing tool and hardware regression suites.

## Career Studio (v35.05)

Career & Professional Documents → Career Studio connects advanced resume editing, reviewed PDF/DOCX/text import, variants and checkpoints, applications and submission snapshots, evidence, interview practice, learning goals, appraisals, professional documents, portfolios and offer comparisons. Career Studio is the single main Career entry. Earlier editors remain under Earlier tools & import with their original routes and data. New alignment controls, reviewed page-impact previews, guided import repair and an application checklist simplify the workflow.

See [the Career Studio guide](docs/career-studio.md), [accepted scope](docs/career-studio-backlog.md) and run npm run test:career together with all existing regression suites.


## Guided workflows (v36.00)

Existing categories now include form-based guided tasks for API chains, Salesforce review, shared complete datasets, images/files, project planning, unit calculations/formula tests, repayment events, schema migrations, test execution, translations, research and portable project bundles. All 69 workspaces and 124 routes remain available. Existing editors are retained, and changes require reviewed apply/handoff actions.

See [the guided workflow guide](docs/guided-workflows.md), [accepted scope](docs/improvement-backlog.md) and [regression evidence](docs/guided-workflows-validation.json). Run `npm run test:guided` for the new workflows or `npm run test:regression` for a fresh build and every existing/new suite. Install browser runtimes and Connection_Server Python requirements first. Large datasets/documents remain memory-only unless explicitly exported; device saving is opt-in.

## PDF review and responsive controls (v37.00)

PDF Workspace now includes a reader with page-linked comments, checklist decisions, source-checked sessions, version-review handoff and reviewed stamp/PDF export. Shared controls add native-select search, focused editor/result views, adjustable pane widths and device/theme styling across existing tools, Connection and Games. All 69 workspaces and 124 routes remain available.

See [the PDF/UI guide](docs/pdf-review-ui.md), [validation evidence](docs/pdf-review-ui-validation.json) and [accepted requirements](docs/pdf-review-device-ui-backlog.md). Run `npm run test:pdf-ui` for focused checks or `npm run test:regression` for the complete suite.


## Shared workflows and reliability (v38.00)

The Project centre keeps reusable records and selected source files in this tab. Share and review requests, environments, OpenAPI contracts, Salesforce describe metadata and research sources before applying them to another editor. Export selected records explicitly. Reusable uploads are limited to 20 files / 60 MB; remove them when finished. Working records are not automatically recovered after closing the page.

Shared datasets support explicit replace/delete, lineage, 20 datasets / 8 MB aggregate, and selected bundle exports. Restore preflights capacity before writing saved workflows. The centre also links to existing guided bundles, Career projects, PDF review sessions and original Settings backups.

Task navigation retains the existing tools and routes. Planning reviews changes against a Kanban snapshot before updating matching task IDs; Kanban Undo and timeline dates remain available. Calendar exports use dated VTODO records. Schema Designer offers SQLite, PostgreSQL and MySQL with foreign-key target/type validation; DDL is a reviewed draft and is not executed.

Localization uses the pinned FormatJS ICU parser for nested plural/select syntax and escaped literals; translation reviews retain up to 20 explicit runs. Citation drafts preserve volume, issue, page ranges, DOI and Unicode authors; RIS roundtrips include multiline fields. Citation outputs remain publisher-review drafts rather than complete CSL style certification.

Games use bounded worker analysis for Sudoku generation/hints, Connect Four and the heavier coaches. Sudoku solutions and repeated analysis are cached with fixed limits. The separate Connection page includes browser/API and user-triggered pairing-server checks. Physical USB hardware still needs device-specific testing.

Run `npm run test:workflows` for rejected-operation and sharing coverage, `npm run test:regression` for all suites, and `npm run inventory` after a dependency change. `docs/dependency-inventory.json` records exact npm pins/integrities, vendor hashes and the Python server pin. Vendor hashes identify the preserved bundles; npm audit does not cover those bundles or Python.

## Guided Connect via QR (v47)

Open Advanced → Connect via QR on both devices. Create connection shows the first QR; Join connection opens the other camera and automatically generates its reply. The first device scans that reply, then both users confirm the matching security code. Send message and Send files appear after both approvals. The old JSON preview/Insert and Generate answer QR controls are removed; manual copy/paste, JSON files, configured-server pairing and network settings remain available. No extra service or dependency is added. See [Connection guide](docs/connection-guide.md).

## Remote friends in Games (v48)

Open Games on both devices and use the right-side Players dock → Connect via QR. Create on one, Join on the other, scan the reply and approve the matching security code on both. Once connected, open one of the six direct multiplayer games → Settings → Remote player. The friend accepts the invitation, then both play from their own devices. Computer and local modes remain. Ludo supports two remote players; local four-player Ludo remains. Remote matches do not write local solo scores or profiles. See [v48 details](docs/release-v48.md). Run `npm run test:remote-games` and full regression.

## Games lobby and board feedback (v49)

Name yourself in the right Players dock, connect via QR, choose a game and Single / Best of three, then Invite friend. Their acceptance opens the game on both devices. The active player's board receives a soft green tint. Results appear over the board in Remote, Computer and Local modes, with View board and Play again. Existing text turn cues and all fifteen games remain. Sound/vibration turn alerts are optional and off by default.

Remote matches support resignation, mutually accepted draws, shared series scores and reviewed recovery after reconnecting. Keep both Games pages open: reconnect by QR, then both confirm Continue interrupted match. Closing/reloading loses recovery state. Both devices need v49. See [v49 details](docs/release-v49.md). Run `npm run test:remote-games`, `npm run test:game-feedback` and full regression.


v50 adds reviewed API exploration, scenario and Composite editing, optional multiplayer turn clocks/starting-player choice, public completed-board review, guided resume sections and image comparison. See [the 50-goal audit](docs/v50-scope.md), [release notes](docs/release-v50.md) and [Android qualification checklist](docs/v50-device-qualification.md). Existing tools, saves, themes and routes are retained; physical Moto/Vivo verification remains separate from browser CI.

The shared Connection handshake uses bounded greeting retries while retaining separate approval on both devices. Native tests deliberately drop the initial greeting on either side and on both sides; physical phone/network qualification remains separate.

Release checks verify a complete HTML guide, current and previous release entries, and an exact match between the guide source and built copy.

Ludo board highlights use visual-only piece markers, leaving the playable token controls intact. Narrow review panels use a single-column layout and wrapping actions; the browser matrix verifies their viewport bounds.

Home search keeps keyboard focus when responsive callbacks reposition results. Regression also checks focus after an explicit resize during keyboard navigation.

## Games logic refinements (v51)

Games adds deeper bounded analysis, measured Sudoku techniques, visible-clue Minesweeper risk, page-local word rotation and optional step-by-step hints. Stable board updates retain cells and controls; actual winning/flipped pieces are marked. Protocol 4 pauses a mismatched public view and offers an explicit host-board status check. Both remote devices need v51. See [scope and limits](docs/games-refinements-v51.md); run `npm run test:game-refinements` and full regression. Existing tools, modes, six themes and save formats remain.

Sudoku displays its measured technique rating with the local game summary, including when no remote match is active. The full guide retains the previous release entries and describes search limits, hint stages and explicit board resynchronization.

## Compact Games and readiness (v52)

Games adds a slim match bar, settings popup/mobile sheet and a width-aware landscape layout. Remote boards and clocks wait for a separate Ready from each player. Optional move previews require explicit confirmation and are discarded when their board/turn/lease becomes stale. Both remote pages need v52 / protocol 5. Save formats, 15 games, all modes and six themes remain. See [scope and usage](docs/games-compact-v52.md); run `npm run test:v52` and full regression.

For a remote match, accept the invitation, review the agreed settings and choose I’m ready on both screens. Move previews are local to the choosing player until confirmed; the turn timer continues while deciding.
