# Tool Studio

Browser tools for calculation, data, development, files and professional documents.

**Live site:** https://abinashtech96.github.io/toolStudio/

The source is organized into **8 categories, 50 workspaces and 63 application modules**. All **105 existing tool routes** remain available. The topbar, saved data keys and reviewed Connection permissions are retained.

## Build and run

Requires Node.js 20 or newer. The production build has no npm dependencies.

```sh
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
npm run test:compatibility
npm run publish:root
node scripts/check.mjs --published
```

Commit the source changes **and** generated root changes. GitHub Pages can continue serving **main / (root)** at `/toolStudio/`; no custom domain, Node server, bundler or root-absolute asset paths are required. `dist/` is local build output and is ignored by git. `.generated-files.json` identifies the root files managed by the publisher and lets it remove outdated hashed chunks safely.

`CHROMIUM_PATH` can select an existing Chromium executable for tests. CI builds the app and runs browser and compatibility checks. A GitHub Pages branch deployment publishes the checked-in root files.

## Source map

| Location | Responsibility |
| --- | --- |
| `src/categories/<Category>/<Workspace>/` | Workspace logic, view fragments, local styles and module metadata |
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

The scoped service worker caches the application shell and resources already used. A feature's optional engine must be loaded while online before that feature can work offline in the hosted app. The downloadable offline build embeds all engines and OCR data. Clear site data to remove downloaded caches; the existing tool reset controls continue managing tool/settings data.

## Connections

Options → Connection opens a separate tab. GitHub Pages serves static files and **does not host a WebSocket/signaling server**. Manual WebRTC pairing remains available; room-code pairing needs your configured HTTPS/WSS endpoint. See [Connection server setup](Connection_Server/README.md). Bluetooth and USB require a compatible browser and device. Automated adapter tests do not certify physical hardware or every TV browser.

No existing tool or OCR functionality was removed. See [regression report](docs/regression.md) for validation and limits.
