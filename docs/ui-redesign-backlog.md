# Homepage and application UI redesign backlog

Recorded: 2026-10-28 (Asia/Calcutta)

Status: implementation authorized and implemented on the review branch for v41. Automated validation is in progress. The final accepted homepage design and existing-workspace constraint below supersede earlier homepage composition proposals.

## Agreed scope

- UIR-01: Establish shared typography, spacing, surfaces, borders, icons, control sizes and action hierarchy. Consolidate existing style overrides as components migrate.
- UIR-02: Refine Pearl and Graphite themes with subtle depth, restrained interaction feedback and reduced-motion support.
- UIR-03: Redesign the homepage around search, recent work, favorites, categories and a browsable tool catalog.
- UIR-04: Keep Guide, version, release notes, theme and Settings access discoverable.
- UIR-05: Support task-oriented tool search using the existing feature index; preserve exact feature navigation.
- UIR-06: Provide useful recent-work context only where reliably available. Allow favorites to be reordered.
- UIR-07: Support grid and compact-list browsing, category filtering, clear descriptions and favorite controls.
- UIR-08: Provide compact file-opening entry with an expandable drop area and explicit target/input replacement review.
- UIR-09: Standardize tool headings, breadcrumbs, favorite controls, contextual guides and feature navigation.
- UIR-10: Give each tool a clear primary action and coherent secondary actions. Organize advanced settings into expandable sections and indicate active custom settings.
- UIR-11: Use appropriate editor, canvas and document-preview layouts. Support resizable panes where useful and an easy layout reset.
- UIR-12: Align editor toolbars and result actions. Provide readable inline errors, line numbers where relevant and clear fullscreen controls.
- UIR-13: Standardize buttons, selectors, labels, menus, dialogs, tooltips and loading/empty/success/error/disabled states. Use searchable selectors for long lists.
- UIR-14: Desktop uses collapsible navigation and an adaptable work area. Tablet supports collapsible navigation and split or stacked content.
- UIR-15: Mobile uses a searchable tool-picker sheet, stacked content, accessible touch targets and a compact primary-action area where appropriate.
- UIR-16: TV provides large text, strong focus, remote navigation and a visible fullscreen exit; preserve equivalent exit controls across fullscreen modes.
- UIR-17: Establish the shared design through the homepage, JSON Studio, Resume Builder and Camera & Image Studio, then extend it to the remaining tools.
- UIR-18: Preserve routes, tools, files, saved work, settings, input state and available actions throughout the redesign.

## Implementation and validation

1. Resolve homepage information hierarchy and visual direction in discussion.
2. Build a representative design preview covering empty and returning-user states, both themes and responsive layouts.
3. Implement shared primitives and the four representative screens before broad migration.
4. Validate each migrated workspace, then run whole-project regression and visual checks.
5. Verify inventory and route retention, navigation/back-forward/deep links, stored data, imports/exports, keyboard/focus behavior, dialogs, layouts, themes and fullscreen exits.
6. Verify homepage startup and update/cache behavior for existing users as well as clean sessions.
7. Record automated results and remaining physical-device/manual qualification separately. Never treat catalog/navigation coverage as proof of every tool behavior.

No runtime files or generated deployment assets are changed by this backlog entry.

## Final accepted direction · 2026-10-28

Homepage order is local-time greeting, search, favorite tools/categories/features, then category tiles. Clicking a tile expands the tools below its row. Search results are grouped into categories, tools and features. Clearing search restores the previous selection. The product is branded ToolStudio; legacy routes and storage identifiers are preserved.

The final instruction is to improve animation, appearance and existing themes within current workspace structures. Exactly the six current themes remain; no additional themes are introduced. Existing pane controls, guides, advanced settings and fullscreen controls are reused. See [v41 implementation](ui-redesign-v41.md) for behavior and validation scope.
