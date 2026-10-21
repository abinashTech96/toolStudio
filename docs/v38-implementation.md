# v38 implementation and regression checklist

Base: v37 (`5ac85f8`). Preserve all 69 workspaces and 124 routes.

## Correctness
- [ ] Typed structural comparisons distinguish arrays, objects, missing and null.
- [ ] Fixture exports publish only validated, current candidates.
- [ ] Career PDF import uses portable stream readers.
- [ ] RIS import/export roundtrips metadata and continuations.
- [ ] Optional server serves Games safely.
- [ ] Rejected PDF edits restore usable controls.
- [ ] Dataset shelf has explicit capacity, replace/delete, lineage and selective export.

## Shared workflows and category improvements
- [ ] Shared project records for requests, environments, contracts, metadata and sources.
- [ ] Explicit reusable file catalogue, limits and processing stages.
- [ ] One task navigator; advanced controls retain their existing inputs/routes.
- [ ] Save/export/recovery centre with explicit inclusion and reviewed restore.
- [ ] Math precision/provenance and boundary coverage; Finance assumptions/date/rounding checks.
- [ ] ICU parsing and translation review history.
- [ ] Reviewed planning handoff between Kanban, workload and calendar.
- [ ] Career import parity and template/language/long-content export coverage.
- [ ] Research formatting and shared sources.
- [ ] SQL dialect and foreign-key/constraint validation.
- [ ] Connection staged self-checks.
- [ ] Games bounded analysis cache and worker search.
- [ ] Shared controls/tokens and responsive verification.
- [ ] First legacy feature isolation and explicit dependency inventory.

## Release gates
- [ ] Targeted failure/cancellation/roundtrip tests.
- [ ] Full existing regression and all route/tool inventory checks.
- [ ] Build, published artifact consistency and size budgets.
- [ ] Commit/push reviewable PR; no merge or deployment requested.

This checklist records implementation and evidence; unchecked items are not claimed complete.
