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
