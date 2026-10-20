# Architecture and maintenance

The edition 31 closure has been migrated into explicit ES modules. The build reads workspace folders and metadata, assembles their view fragments, preserves style order, and emits hashed category/core/shared chunks with relative URLs suitable for GitHub Pages project hosting.

## Workspace anatomy

Each existing workspace contains:

- `module.json`: stable workspace ID, category ID, route aliases and ordering.
- `logic.js`: exported `id`, `register(context)` and ordered initialization steps.
- `view.html`: one or more marked native view fragments, including legacy sub-tool routes.
- Optional local stylesheet files referenced by the style manifest.

`src/initialization.json` records shared bindings, module paths and original initialization order. `src/registry-seed.json` records legacy routes, fragment ownership and styles. These are migration manifests, not a second executable application.

All function declarations are registered before any initializer runs, preserving the original closure's hoisting behavior. Initializers execute in their original global order. Duplicate IDs, missing migrated workspaces, duplicate initializer positions and missing view fragments fail clearly instead of producing a partially working app.

## Shared state and serialization

Migrated modules reference an explicit live-binding context (`__studio33`). This preserves settings, cross-tool transfers, undo history and shared engines without relying on undeclared globals. It also exposes the remaining dependencies between workspaces rather than pretending every migrated tool is isolated.

Some workers and exported forms serialize helper functions. The context preserves those functions' original standalone source through their own `toString` implementation. Keep this behavior when editing serialized helpers, and test both the UI function and its worker/exported form. The offline build uses matching lexical binding aliases so the same serialization and compatibility fixtures remain valid.

Core helpers such as library loading belong in core/shared even where an existing migration assigns their initialization to a historical owner. Move these only with their ordered initializer and dependency checks. An existing workspace cannot yet be deleted solely by removing its folder; it may provide helpers to another workspace. Hide it using Manage tools, or explicitly migrate its dependencies first. No tools have been removed.

## Labels and grouping

Renaming a category or workspace folder changes its display label on the next build without changing its stable ID. Workspace paths are discovered at build time. Preserve `module.json` IDs and routes. Moving a workspace between categories requires updating the source navigation catalog and checking all aliases, favorites, search, backups and device layouts; source ownership and the older navigation catalog remain distinct migration concerns.

Adding an entirely new tool requires its view, route registration, state validation, lifecycle and regression coverage as well as metadata. Dropping an arbitrary folder into the tree is not a plugin API.

## Startup, resources and lifecycle

The shell and ten category/core/shared chunks load at startup to retain legacy initialization guarantees. Existing DOM parking and deferred enhancement mounting keep inactive views out of the live document. This migration does not claim that every tool's executable logic is independently lazy-loaded.

Large vendor engines and OCR data load on demand. Resource requests are deduplicated and retryable. The capture guard delays dependent actions until their engines are ready and refuses to replay an action against edited inputs. Native file/camera chooser clicks retain their user gesture. Workspace transitions preserve existing processing cancellation and emit `toolstudio:workspace` with a generation counter.

`calcStudio.architecture()`, `calcStudio.modules()` and `calcStudio.ensureToolResources(id, target)` provide read-only diagnostics and explicit preloading. They do not expose private tool state.

## Connection page

`src/connections/connection.js` owns the session and reviewed tab bridge. `websocket.js`, `bluetooth.js` and `usb.js` install their own adapter behavior. `signaling.js` owns room/manual pairing; `qr.js` loads shared local QR libraries on demand. No transport connects automatically on page load. The offline Connection artifact embeds these same modules.

## Service worker and publishing

Cache names include the project scope and build revision. The worker handles only same-origin GET requests under the app's known static paths. It does not cache arbitrary API endpoints or outbound requests. Cache-first static resources and network-first navigation support reloads after installation; optional engines are cached when fetched. The worker removes only older caches belonging to its own scope.

`npm run publish:root` copies `dist` into the repository root and records managed paths. Do not put handwritten files at generated paths. Old app/guide/Connection filenames redirect while preserving query strings and fragments. The downloadable offline pair is in `offline/` on the site.


## Edition 34 native workspaces

The registry now contains 11 categories, 68 workspaces, 81 source modules and 123 routes. The original 105 route IDs and 63 migrated modules remain intact. Eighteen native workspace folders use `kind: "native"` metadata. Their entry files reexport mount functions from `src/advanced/workspaces/`; esbuild emits split ES modules loaded on first open. Existing-tool panels in `src/advanced/enhancements/` mount only when expanded.

`src/advanced/runtime.js` installs the native routes after legacy initialization and before lifecycle diagnostics. It integrates workspace tabs, task shortcuts, layout preferences, opt-in draft recovery, recipes and validated backup/reset state. Native state uses `calc-studio-advanced-v34`; the existing storage keys are retained. Draft recovery excludes file/password controls and masks detected credentials and email addresses, but is not a general sensitive-data classifier.

`ui.js` supplies labelled controls, action cancellation, result revision checks, paged tables and report export. `algorithms.js` contains deterministic transformations. Heavy SQL, schema validation, simulation and large-file profiles run in terminable worker jobs with time and size limits. Optional SQL WASM, PDF.js and PDF editing engines are copied from pinned dependencies, hashed and loaded locally. Imported data does not execute application code. Integration requests and device writes require explicit reviewed actions.

`npm ci` is required before building. `build-advanced.mjs` emits hosted chunks and an equivalent offline IIFE, with optional engine bytes embedded in the offline build. `pack-offline.mjs` gzip-packs the published standalone file and bundles its decompressor; `check --published` compares unpacked output with the generated raw file. The hosted service worker precaches native code and caches optional engines on first use. No server is required for these modules; remote APIs still need their own endpoint and browser CORS permission.


## Edition 35 lifecycle

Hosted initialization preserves original order while yielding between slices. `src/advanced/safety.js` owns exact-value, structured-input, encoding and export helpers; `storage.js` owns workspace save/recovery/conflict transitions. Advanced workers are pooled and bounded; SQL retains imports only while its source is unchanged. Workspace preview resources are disposable, while source inputs remain available. Service-worker activation waits for a reviewed handover. See [performance and limits](performance35.md).

## Home, registry navigation and helper sources

`src/core/home.js` adds Home after native registration, preserving the 123 tool routes and existing state keys. `src/core/catalog.js` derives workspace labels and category membership from the generated registry for dropdowns, including shared saved-work tools. Legacy feature aliases and optional-tool visibility remain available.

`src/shared/services/` contains five shared service modules; `src/shared/initializers/` contains four groups preserving all 1,083 initializer positions. `utilities.js` composes these modules. Legacy tools still share ordered initialization and live bindings; independent deletion/lazy initialization of every original tool is not yet supported.

The hosted build pools literal original-source arguments to `$fn` using `scripts/serialized-sources.mjs`. Exact sources are stored in a hashed, gzip-compressed resource and resolved when serialization needs them. The service worker precaches that resource. Executable helper bodies are unchanged; the standalone build retains inline sources. Compatibility tests cover workers and exported forms.

`src/shared/styles/workspace.css` supplies shared control tokens, action hierarchy, output styling, keyboard focus and scrollbar styling using existing theme variables. Device-specific sizing remains available.
