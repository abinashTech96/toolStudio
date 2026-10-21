# v38 implementation and regression checklist

Base: v37 (`5ac85f8`). Preserve all 69 workspaces and 124 routes.

## Correctness
- [x] Typed structural comparisons distinguish arrays, objects, missing and null.
- [x] Fixture exports publish only validated, current candidates.
- [x] Career PDF import uses portable stream readers.
- [x] RIS import/export roundtrips metadata and continuations.
- [x] Optional server serves Games safely.
- [x] Rejected PDF edits restore usable controls.
- [x] Dataset shelf has explicit capacity, replace/delete, lineage and selective export.

## Shared workflows and category improvements
- [x] Shared project records for requests, environments, contracts, metadata and sources.
- [x] Explicit reusable file catalogue, limits and processing stages.
- [x] One task navigator; advanced controls retain their existing inputs/routes.
- [x] Save/export/recovery centre with explicit inclusion and reviewed restore.
- [x] Math precision/provenance and boundary coverage; Finance assumptions/date/rounding checks.
- [x] ICU parsing and translation review history.
- [x] Reviewed planning handoff between Kanban, workload and calendar.
- [x] Career import parity and template/language/long-content export coverage.
- [x] Research formatting and shared sources.
- [x] SQL dialect and foreign-key/constraint validation.
- [x] Connection staged self-checks.
- [x] Games bounded analysis cache and worker search.
- [x] Shared controls/tokens and responsive verification.
- [x] First legacy feature isolation and explicit dependency inventory.

## Release gates
- [ ] Targeted failure/cancellation/roundtrip tests.
- [ ] Full existing regression and all route/tool inventory checks.
- [ ] Build, published artifact consistency and size budgets.
- [ ] Commit/push reviewable PR; no merge or deployment requested.

This checklist records implementation and evidence; unchecked items are not claimed complete.


Implementation notes:
- The first extracted legacy rules cover Kanban completion/blocking and are shared with the workload adapter. The remaining shared bindings stay compatible; this is the start of gradual isolation.
- The build consolidates the legacy styles in exact shell order into one minified stylesheet. Original style IDs remain available, and new controls use the shared tokens.
- Citation output is a richer reviewed draft; no complete CSL/publisher certification is claimed.
- Project records, reusable files and datasets remain in memory until explicit export. Career, PDF and legacy backup formats remain accessible through the centre.
