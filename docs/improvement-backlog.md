# Tool Studio improvement backlog

Updated: 2026-10-21

Status: implementation authorized by the user on 2026-10-21; implemented in the v36.00 guided-workflow branch. See guided-workflows.md for supported behavior and limits, and guided-workflows-validation.json for regression evidence. Career Studio v35.05 is covered separately in career-studio-backlog.md and was merged in PR #6.

## Shared requirements

- Improve existing workspaces and connect related workflows without introducing overlapping tools.
- Prefer visual editors and forms; retain raw JSON under Advanced where useful.
- Standardize primary actions, review/apply/export placement, responsive editor/output layouts and collapsed advanced settings.
- Preserve existing routes, tools, projects, files and entered data. Review migrations and changes before applying them.
- Retain local/offline functionality and make helper/server requirements explicit for any future connected feature.
- Run affected tests and whole-project regression when implementation changes runtime behavior. Include mobile, accessibility, offline, data preservation and actual export checks appropriate to each change.

## Accepted category improvements

### DEV — Developer, API & Automation

- DEV-01: Visual request-chain builder.
- DEV-02: Variable inspector showing where values originate and identifying unresolved substitutions.
- DEV-03: Select response fields to build reviewable assertions.
- DEV-04: Save and compare execution runs, highlighting new failures and slower requests.

### SF — Salesforce Utilities

- SF-01: Searchable object/field metadata explorer.
- SF-02: Visual Composite request builder with reference connections.
- SF-03: Explain errors beside the affected request or field.
- SF-04: Review field mappings and highlight incompatible types.

### DATA — Data & Tables

- DATA-01: Shared dataset selection across Workbench, Quality, Query and Comparison.
- DATA-02: Visual transformation steps and column-mapping forms.
- DATA-03: Explicit before/after row counts and operation history.
- DATA-04: Distinguish sampled previews from full-dataset operations. The advanced Workbench editor currently initializes its left records from api.getRows().slice(0,100) in src/advanced/enhancements/data.js. Review this behavior and ensure a limited preview cannot be mistaken for a complete-data operation; do not infer data loss without tracing the actual operation.

### FILE — Files, Images & Design

- FILE-01: Visual image-layer panel with reordering, visibility and locking.
- FILE-02: Multi-object alignment and equal spacing.
- FILE-03: Link OCR corrections to the relevant region of the source image.
- FILE-04: Batch processing with per-file results and individual-file retry.

### PLAN — Productivity & Planning

- PLAN-01: Connect tasks, notes, decisions and deadlines within a project.
- PLAN-02: Weekly workload planning based on entered estimates.
- PLAN-03: Clear blocked-task explanations.
- PLAN-04: Keyboard-friendly bulk editing.

### MATH — Math & Measurement

- MATH-01: Unit-aware notebook calculations and dimensional consistency checks.
- MATH-02: Linked calculations that show which results depend on an input.
- MATH-03: Clear explanations when a formula cannot produce a valid result.

### FIN — Finance

- FIN-01: Editable repayment-event timeline for rate changes and extra payments.
- FIN-02: Compare projected schedules against imported statements.
- FIN-03: Explain differences attributable to fees, dates and rounding assumptions. Keep entered assumptions visible and avoid unsupported lender-specific claims.

### TEST — Testing & Quality

- TEST-01: Guided test-execution screen.
- TEST-02: Create reviewed fixtures from API responses.
- TEST-03: Build assertions from selected JSON differences.
- TEST-04: Track repeated failures across saved runs.

### SYS — Systems & Architecture

- SYS-01: Visual schema editing.
- SYS-02: Compare schema versions.
- SYS-03: Trace the impact of renamed/deleted fields through dependencies.
- SYS-04: Generate a reviewed migration plan with required data-preparation steps.

### TEXT — Text & Writing

- TEXT-01: Translation grid with inline placeholder checks.
- TEXT-02: Reusable terminology suggestions.
- TEXT-03: Markdown outline navigation.
- TEXT-04: Connect citations and source notes from Research Notebook.

### RESEARCH — Knowledge & Research

- RESEARCH-01: Form-based source and note entry.
- RESEARCH-02: Link claims to passages and document pages.
- RESEARCH-03: Explicit tracking of contradictory evidence.
- RESEARCH-04: Missing-reference and source-review reminders.

### WORK — My Work & Settings

- WORK-01: Portable project bundles containing linked datasets, documents and settings.
- WORK-02: Selective restore with conflict previews.
- WORK-03: Check for missing files and broken project references.

## Recommended implementation order

1. Developer/API usability: visual chains, variables, assertions and execution review.
2. Salesforce workflows: metadata, Composite requests, mappings and error explanations.
3. Data workflow safety: shared datasets, explicit row counts and reviewed transformations.
4. Files/Images and Productivity, followed by the remaining categories based on discussion.

The user subsequently authorized the complete batch, including the nine capabilities below. Deployment remains separate from implementation and review.


## Additional accepted capabilities

1. API Failure Playground: offline timeouts, rate limits, malformed responses, duplicate-event/retry policy review.
2. Salesforce Flow Reviewer: supplied XML paths, disconnected elements and missing fault-connector prompts.
3. Permission Change Review: supplied Profile/PermissionSet XML rights and source-file differences.
4. Spreadsheet-to-API Rehearsal: CSV mappings, typed/required row validation and batch previews.
5. Migration Acceptance Report: key/value matches, totals, missing relationships and validation failures.
6. Document Pack Inspector: expected files, duplicate hashes, ordered files, PDF page counts and size limits.
7. Form Usability Tester: labels, keyboard order, required messages and mobile/desktop preview.
8. Formula Test Bench: expected values/tolerances against linked unit-aware calculations.
9. Bug Reproduction Pack: selected masked inputs, steps, release version and expected/actual results.

All capabilities extend existing workspaces. No new main routes were introduced.

## Next accepted planning wave — PDF review and device-wide UI

The user accepted the PDF reading/review/annotation proposals and requested UI optimization across all devices. Track PDF-01–PDF-06 and UI-01–UI-14 in [PDF review and device-wide UI backlog](pdf-review-device-ui-backlog.md).

Status: planning only. This wave is separate from the implemented v36.00 items above. Preserve every existing tool, route and entered work; run targeted and full regression when runtime changes are implemented.
