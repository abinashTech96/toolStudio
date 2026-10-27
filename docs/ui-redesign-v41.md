# ToolStudio v41 homepage and theme refresh

The root URL opens a category-first homepage. All 11 categories are represented as tiles; the initial view does not pre-open a tool collection. Existing route IDs, browser-history behavior, storage keys and offline filenames remain stable.

## Homepage

- Greeting, local date/time and timezone come from the visitor's device. Boundaries are 05:00 morning, 12:00 afternoon, 17:00 evening and 22:00 night. The clock refreshes at minute boundaries and on focus, page resume and visibility changes. It pauses while hidden or inside a tool. No location service is contacted.
- Favorites follow search, with separate labels and direct actions for tools, categories and individual features. Existing tool favorites remain in `calc-studio-favorites`. New category and feature pins use the existing validated Home backup record.
- A category expands its tools below the selected grid row. The selected tile retains focus. Selecting it again collapses; resizing repositions the same result section beneath the correct row.
- Tools retain their exact routes. Expand a card's feature list to launch or pin a specific operation. Disclosure pins use stable element IDs or normalized labels instead of index counters.
- Search groups Categories, Tools and Features and retains exact feature actions, including loan/EMI mode. Each group initially renders up to 24 results, with Show more for the remainder. Clearing search restores the prior category. Optional-tool controls remain accessible while searching.
- Grid/List, category order, favorite order and recent-work visibility are customizable. Reset Home layout restores presentation preferences while retaining favorite pins and entered work.
- Recent work, saved-project review, existing quick actions and reviewed file handoff remain under an expandable section. Open a file and dragging a file reveal the area. File selection still requires explicit review before replacing a target tool's input.
- Guide, version, release notes, Connection and Games remain available. Standalone Guide and release notes use the embedded guide. Legacy Calc_Studio filenames remain compatible.

## Existing workspace UI

The final user instruction keeps existing workspace structure and functionality, refining its animation and appearance. Shared styles improve control hierarchy, editor surfaces, focus, dialogs and scrollbars. Existing advanced controls, pane resizing, tool pickers and fullscreen exits are retained.

Exactly six theme IDs remain: cartoon, forest, sky, neon, pearl and graphite. Their surfaces, contrast and depth are refined; no theme is added. Cartoon uses a separate dark text accent for links and icons while retaining its pink button accent.

Category content uses a short transform/opacity entrance. Ambient border/header effects now animate opacity/transforms rather than continuously moving painted backgrounds or shadows. Existing motion Off/Reduced, system reduced-motion and visibility handling remain in effect. Achievable frame rate depends on the browser, display and device; this release does not claim physical 120 fps certification.

## Validation

- New unit checks cover greeting boundaries, backwards-compatible preferences, invalid metadata, stable feature identities and grouped discovery.
- New browser checks cover visitor timezone, greetings on resume, category row placement during resizing, all three favorite types, backups, exact feature actions, draft retention, six-theme bounds and accessibility, reduced motion and throttled search.
- Existing homepage, import, offline, navigation, tool behavior and complete regression suites remain required.
- Existing workspace UI regression audits all 84 workspaces at phone, tablet and desktop sizes (252 layouts). Inventory retention remains 84 workspaces and 139 routes, including all 105 original routes.
- GitHub Actions runs the new homepage checks on Chromium, Firefox and WebKit alongside the existing browser matrix.
- Automated summaries are written under `test-results/`. Physical phone/TV/remote, screen-reader and 120 Hz display qualification remain manual; earlier v40 hardware qualifications are unaffected.
