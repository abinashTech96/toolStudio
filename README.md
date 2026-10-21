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
| `src/connections/` | Separate Connection page, signaling, WebSocket, Bluetooth and USB adapters |
| `public/assets/` | Local OCR models and third-party engines |
| `public/guide.html` | Existing user guide |
| `Connection_Server/` | Optional Python static/signaling helper |
| `scripts/` | Deterministic build, validation, local server and Pages publisher |

Folder names supply display labels; `module.json` IDs and routes remain stable for saved state and links. See [architecture](docs/architecture.md) before moving modules or changing shared bindings.

## Loading and offline use

The hosted shell is approximately 269 KB, compared with the previous 13.7 MB HTML file. Application logic is split into ten compact startup chunks; OCR, PDF, spreadsheet, QR, barcode, archive and text-worker resources load when needed. Offline OCR is retained with SHA-256 checks on its original assets.

The scoped service worker caches the application shell and resources already used. A feature's optional engine must be loaded while online before that feature can work offline in the hosted app. The downloadable offline build embeds all engines and OCR data. Its published file is gzip-packed with a bundled JavaScript unpacker and opens without a server. Clear site data to remove downloaded caches; the existing tool reset controls continue managing tool/settings data.

## Connections

Options → Connection opens a separate tab. GitHub Pages serves static files and **does not host a WebSocket/signaling server**. Manual WebRTC pairing remains available; room-code pairing needs your configured HTTPS/WSS endpoint. See [Connection server setup](Connection_Server/README.md). Bluetooth and USB require a compatible browser and device. Automated adapter tests do not certify physical hardware or every TV browser.

See [edition 35 performance, accuracy and recovery](docs/performance35.md) for the latest existing-tool improvements and explicit limits.

See [edition 34 features](docs/features34.md) for the new workspaces, existing-tool improvements, limits and reviewed actions.

No existing tool or OCR functionality was removed. See [regression report](docs/regression.md) for validation and limits.

## Games and homepage update

Options → Games opens seven separate games with local coaching, difficulty controls, fullscreen/Exit and opt-in progress saving. See [Games guide](docs/games.md) and [v35.02 release behavior](docs/release-v35.02.md). Home includes the full Guide, version, reviewed file entry and saved-project review; update notices identify the installed and waiting versions.

Run npm run test:games, npm run test:home-extras and npm run test:updates along with the existing regression suites.

## Guided Connection setup

Options → Connection now starts with a method chooser and readable setup guides for phone/computer pairing, BLE, USB and WebSocket. Manual pairing and advanced tools remain available. See [the Connection guide](docs/connection-guide.md). Run npm run test:connection alongside existing tool and hardware regression suites.

## Career Studio (v35.05)

Career & Professional Documents → Career Studio connects advanced resume editing, reviewed PDF/DOCX/text import, variants and checkpoints, applications and submission snapshots, evidence, interview practice, learning goals, appraisals, professional documents, portfolios and offer comparisons. Career Studio is the single main Career entry. Earlier editors remain under Earlier tools & import with their original routes and data. New alignment controls, reviewed page-impact previews, guided import repair and an application checklist simplify the workflow.

See [the Career Studio guide](docs/career-studio.md), [accepted scope](docs/career-studio-backlog.md) and run npm run test:career together with all existing regression suites.


## Guided workflows (v36.00)

Existing categories now include form-based guided tasks for API chains, Salesforce review, shared complete datasets, images/files, project planning, unit calculations/formula tests, repayment events, schema migrations, test execution, translations, research and portable project bundles. All 69 workspaces and 124 routes remain available. Existing editors are retained, and changes require reviewed apply/handoff actions.

See [the guided workflow guide](docs/guided-workflows.md), [accepted scope](docs/improvement-backlog.md) and [regression evidence](docs/guided-workflows-validation.json). Run `npm run test:guided` for the new workflows or `npm run test:regression` for a fresh build and every existing/new suite. Install browser runtimes and Connection_Server Python requirements first. Large datasets/documents remain memory-only unless explicitly exported; device saving is opt-in.

## PDF review and responsive controls (v37.00)

PDF Workspace now includes a reader with page-linked comments, checklist decisions, source-checked sessions, version-review handoff and reviewed stamp/PDF export. Shared controls add native-select search, focused editor/result views, adjustable pane widths and device/theme styling across existing tools, Connection and Games. All 69 workspaces and 124 routes remain available.

See [the PDF/UI guide](docs/pdf-review-ui.md), [validation evidence](docs/pdf-review-ui-validation.json) and [accepted requirements](docs/pdf-review-device-ui-backlog.md). Run `npm run test:pdf-ui` for focused checks or `npm run test:regression` for the complete suite.
