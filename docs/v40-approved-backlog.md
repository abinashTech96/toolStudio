# ToolStudio — next improvement backlog

Prepared: 27 October 2026

Status: proposed for discussion. This document creates a backlog only; it does not authorize or claim implementation.

## Baseline

Reviewed main commit [eeab701](https://github.com/abinashTech96/toolStudio/commit/eeab701a4cd033aaefc8d0a863c52b30e06fe819), which merges [PR #10](https://github.com/abinashTech96/toolStudio/pull/10). The previous 50-item v39 backlog is marked implemented. The established inventory is 69 workspaces and 124 routes, including 105 original routes. Confirm this baseline again before implementation.

These are improvement proposals and validation work, not a list of 30 reproduced defects. Where a feature already exists, extend its coverage or behavior rather than introducing a parallel control. Re-check current source at implementation time and close an item as already satisfied when its acceptance criteria are already met.

## Priorities and sizing

- P1: recommended for the next implementation batch; addresses output confidence, recovery, compatibility or critical interaction paths.
- P2: subsequent enhancement once the foundation is verified.
- S/M/L are relative scope estimates, not delivery promises. L items need a short design/prototype before committing to the complete implementation.
- Every item starts as Proposed; Suggested first batch is TS-040-01, 02, 03, 05 and 06. Run TS-040-04 alongside this when physical hardware is available. Follow with 08, 10, 15, 22 and 28.
- The TS-040 identifier is a planning series, not an assigned release version. Group completed work into releases after sizing.

## Backlog index

| ID | Priority | Area | Size | Improvement |
|---|---|---|---|---|
| TS-040-01 | P1 | Release | M | Upgrade existing browser sessions safely |
| TS-040-02 | P1 | Recovery | M | Recover cleanly when local storage fails |
| TS-040-03 | P1 | Calculations | M | Verify scenario results belong to current inputs |
| TS-040-04 | P1 | Connection | M | Qualify real Bluetooth and USB devices |
| TS-040-05 | P1 | Calculations | M | Add independent numerical reference cases |
| TS-040-06 | P1 | Quality | S | Report behavioral coverage for every route |
| TS-040-07 | P2 | UI | M | Finish consistent action styling in legacy tools |
| TS-040-08 | P1 | Mobile UI | M | Handle the on-screen keyboard and safe areas |
| TS-040-09 | P2 | UI | M | Show meaningful stages for long operations |
| TS-040-10 | P1 | Accessibility | M | Validate complete screen-reader journeys |
| TS-040-11 | P2 | TV UI | M | Test remote-only navigation through complete tasks |
| TS-040-12 | P2 | UI | S | Reset one workspace/device layout independently |
| TS-040-13 | P2 | Career | L | Merge master updates within resume sections |
| TS-040-14 | P2 | Career | L | Support mixed-script font fallback |
| TS-040-15 | P1 | Career | M | Verify text extracted from actual exported files |
| TS-040-16 | P2 | Career | L | Improve exported document semantics |
| TS-040-17 | P2 | Career | M | Improve page-break decisions for resume entries |
| TS-040-18 | P2 | Career | M | Make custom-font projects reproducible |
| TS-040-19 | P2 | Developer | M | Preflight a request collection before sending |
| TS-040-20 | P2 | Salesforce | M | Explain the impact of metadata changes |
| TS-040-21 | P2 | Data | L | Trace cleaned output back to source rows |
| TS-040-22 | P1 | Data | M | Offer spreadsheet-safe CSV export |
| TS-040-23 | P2 | Logs | M | Compare logs with explicit clock offsets |
| TS-040-24 | P2 | Performance | L | Process larger tabular previews responsively |
| TS-040-25 | P2 | Connection | M | Provide a guided device simulator |
| TS-040-26 | P2 | Connection | M | Check saved profiles against connected capabilities |
| TS-040-27 | P2 | OCR | L | Review regional OCR across a page batch |
| TS-040-28 | P1 | Images | M | Prove redactions are removed from exported pixels |
| TS-040-29 | P2 | PDF review | L | Review annotation placement after version changes |
| TS-040-30 | P2 | Media | M | Validate the bytes produced by media exports |

## Item details

### TS-040-01 — Upgrade existing browser sessions safely

Priority: P1 · Size: M · Status: Proposed

Scope: Extend update fixtures to start from v36/v37/v38 caches, restore a real draft, activate v39/current assets and test reload/offline transitions. Show the running version and preserve user inputs.

Acceptance: An existing cached tab, a fresh tab and an offline restart reach the intended release; no mixed-revision chunk errors or lost drafts.

Starting points: src/core/updates.js; src/core/service-worker.js; tests/update.browser.mjs; tests/fixtures/recovery.

### TS-040-02 — Recover cleanly when local storage fails

Priority: P1 · Size: M · Status: Proposed

Scope: Exercise IndexedDB denial, quota exhaustion, interrupted writes and invalid snapshots. Keep the last valid snapshot and offer a reviewed portable export when saving cannot finish.

Acceptance: No failure reports Saved; the last committed snapshot remains readable and failure recovery does not clear unrelated local data.

Starting points: src/workflows/project-recovery.js; src/workflows/project-recovery-ui.js.

### TS-040-03 — Verify scenario results belong to current inputs

Priority: P1 · Size: M · Status: Proposed

Scope: Bind pinned outputs to an input signature, successful run revision, tool version and calculation policy. Mark unverified legacy snapshots clearly and require recomputation before treating them as current.

Acceptance: Changing any contributing input makes the result stale; failed/cancelled runs cannot become a verified pinned result.

Starting points: src/workflows/numerics.js; src/core/processing.js.

### TS-040-04 — Qualify real Bluetooth and USB devices

Priority: P1 · Size: M · Status: Proposed

Scope: Create a documented physical-device matrix covering permission denial/revocation, disconnects, timeout, reconnect and unsupported characteristics/endpoints. Keep this separate from simulated test evidence.

Acceptance: Record actual device, OS, browser and outcome for each case; unsupported platforms get an accurate explanation. Physical testing stays blocked until hardware is available.

Starting points: src/connections/bluetooth.js; src/connections/usb.js; tests/compatibility/hardware.cjs.

### TS-040-05 — Add independent numerical reference cases

Priority: P1 · Size: M · Status: Proposed

Scope: Build fixed expected-answer datasets for finance rounding, conversions, dates and numerical edge cases, with explicit assumptions and independently derived expected values.

Acceptance: Include zero/negative/boundary inputs and rounding ties; a formula regression fails even if the UI still renders.

Starting points: src/workflows/rounding.js; src/workflows/calendar.js; tests/v39.unit.mjs.

### TS-040-06 — Report behavioral coverage for every route

Priority: P1 · Size: S · Status: Proposed

Scope: Map the catalog routes to regression cases, distinguishing navigation-only coverage from an actual output assertion. Identify remaining routes needing behavioral fixtures.

Acceptance: Every retained route appears in the report; newly added or renamed routes cannot silently disappear from the mapping.

Starting points: src/core/catalog.js; tests/smoke.mjs; scripts/regression.mjs.

### TS-040-07 — Finish consistent action styling in legacy tools

Priority: P2 · Size: M · Status: Proposed

Scope: Audit remaining legacy rows against the shared action model: one clear primary action, consistent secondary/destructive styling and task-local advanced controls. Preserve all handlers and discoverability.

Acceptance: Before/after checks retain every action; phone/tablet/desktop layouts and keyboard operation pass. No tool is removed to simplify its UI.

Starting points: src/core/workspace-ui.js; src/core/shell.js; tests/workspace-ui.browser.mjs.

### TS-040-08 — Handle the on-screen keyboard and safe areas

Priority: P1 · Size: M · Status: Proposed

Scope: Make dialogs, searchable pickers, sticky actions and editors respond to the visual viewport, keyboard opening, orientation changes and device safe areas.

Acceptance: On real iOS/Android browsers, active fields and Save/Cancel remain reachable without sideways scrolling or obscured controls.

Starting points: src/core/device.js; src/core/editors.js; src/core/workspace-ui.js.

### TS-040-09 — Show meaningful stages for long operations

Priority: P2 · Size: M · Status: Proposed

Scope: Extend common processing status with real stages and bounded completed/total work where measurable. Preserve completed batch outputs when cancellation is supported.

Acceptance: Status never shows fabricated percentages; cancel stops subsequent work and late completions cannot replace current results.

Starting points: src/core/processing.js; src/workflows/media.js; src/workflows/image-batch.js.

### TS-040-10 — Validate complete screen-reader journeys

Priority: P1 · Size: M · Status: Proposed

Scope: Manually test representative end-to-end tasks with NVDA and VoiceOver, beyond automated accessibility scans: tool selection, editing, error correction, result announcements and export.

Acceptance: Record the tested browser/reader pair and repair concrete focus, name, order and announcement defects with regression cases where automatable.

Starting points: tests/workspace-ui.browser.mjs; tests/career.browser.mjs.

### TS-040-11 — Test remote-only navigation through complete tasks

Priority: P2 · Size: M · Status: Proposed

Scope: Audit directional focus through tool pickers, action menus, dialogs and nested modes; define a consistent Back/Return flow while preserving text entry.

Acceptance: A user can open a tool, change a value, reach its result and return home using a remote without a focus trap.

Starting points: src/core/device.js; src/core/navigation.js; tests/workspace-ui.browser.mjs.

### TS-040-12 — Reset one workspace/device layout independently

Priority: P2 · Size: S · Status: Proposed

Scope: Add a clearly scoped reset for the current workspace's pane width, action density and device presentation preferences, with a preview of what will reset.

Acceptance: Resetting a phone layout leaves desktop preferences, entered data, recovery snapshots and other workspaces intact.

Starting points: src/core/workspace-ui.js.

### TS-040-13 — Merge master updates within resume sections

Priority: P2 · Size: L · Status: Proposed

Scope: Extend the existing section-level comparison with field/bullet-level conflict review using a recorded common base. Preserve tailored wording when the master profile changes.

Acceptance: Independent edits merge without replacement; conflicting edits require explicit choices, and Undo restores the exact prior variant.

Starting points: src/career/app.js: versions; src/career/model.js.

### TS-040-14 — Support mixed-script font fallback

Priority: P2 · Size: L · Status: Proposed

Scope: Extend existing font preflight and custom fonts to per-run fallback and shaping validation for mixed Latin, Hindi, Odia, Arabic and Hebrew content.

Acceptance: Reference exports preserve text, glyph shaping, numbers, links and reading order; unsupported coverage is reported before download.

Starting points: src/career/rtl.js; src/career/documents.js; src/career/app.js.

### TS-040-15 — Verify text extracted from actual exported files

Priority: P1 · Size: M · Status: Proposed

Scope: Round-trip exported PDF and DOCX bytes through independent readers and compare essential resume facts and reading order with the source document.

Acceptance: Names, dates, bullets and links survive export without duplication, omission or scrambled ordering. Report tested compatibility without claiming universal ATS certification.

Starting points: src/career/documents.js; tests/career.browser.mjs; tests/v39.browser.mjs.

### TS-040-16 — Improve exported document semantics

Priority: P2 · Size: L · Status: Proposed

Scope: Add proper Word heading/list styles and assess tagged PDF structure, document language, logical reading order and meaningful link text.

Acceptance: Assistive technology can navigate headings and lists in the exported document; limitations of the PDF library are documented and tested.

Starting points: src/career/documents.js; src/career/links.js.

### TS-040-17 — Improve page-break decisions for resume entries

Priority: P2 · Size: M · Status: Proposed

Scope: Extend the current heading spacing heuristic with paragraph widow/orphan checks and keeping a short role/education entry together when it fits.

Acceptance: Long and short fixtures across A4/Letter, fonts, margins and hyperlinks avoid orphaned headings or clipped text without dropping content.

Starting points: src/career/documents.js: createPDFExporter.

### TS-040-18 — Make custom-font projects reproducible

Priority: P2 · Size: M · Status: Proposed

Scope: Allow explicit inclusion of a selected custom font in a portable resume project, with size limits, metadata and a checksum; retain a usable fallback when the font is omitted.

Acceptance: Importing on a second browser reproduces the selected font or clearly identifies the missing font before export. Never include font bytes without the user's selection.

Starting points: src/career/app.js; src/career/documents.js.

### TS-040-19 — Preflight a request collection before sending

Priority: P2 · Size: M · Status: Proposed

Scope: Extend existing request approval with a collection-level dry run: show resolved destinations, missing variables, redacted headers and dependency order before execution.

Acceptance: Dry run performs no network requests; unresolved dependencies block the affected requests and secrets remain redacted in saved reports.

Starting points: src/release39/developer.js; src/workflows/project.js.

### TS-040-20 — Explain the impact of metadata changes

Priority: P2 · Size: M · Status: Proposed

Scope: Compare two supplied Salesforce metadata snapshots and identify changed field types, required fields, references and mapping assumptions.

Acceptance: Report additions/removals/type changes with exact API names; applying a mapping remains an explicit reviewed action.

Starting points: src/release39/developer.js; src/advanced.

### TS-040-21 — Trace cleaned output back to source rows

Priority: P2 · Size: L · Status: Proposed

Scope: Add row-level lineage to reviewed data transformations: source dataset/checksum, original row identifier and applied changes. Keep it available in the change report.

Acceptance: A corrected or joined output row can be traced to its original rows; Undo and selective correction retain this lineage.

Starting points: src/release39/data.js; src/workflows/csv.js.

### TS-040-22 — Offer spreadsheet-safe CSV export

Priority: P1 · Size: M · Status: Proposed

Scope: Review cells that spreadsheet programs may interpret as formulas. Offer an explicit escaping mode and preserve an exact raw-data export separately.

Acceptance: Fixtures cover formula-like strings, whitespace, tabs, quotes and multiline cells; preview explains changed values and round-trip import does not silently corrupt them.

Starting points: src/workflows/csv.js; src/release39/data.js.

### TS-040-23 — Compare logs with explicit clock offsets

Priority: P2 · Size: M · Status: Proposed

Scope: Allow a user-entered offset/timezone normalization when correlating logs from multiple systems. Display original and adjusted timestamps together.

Acceptance: An explicit known-offset fixture aligns events correctly; ambiguous timestamps stay flagged and raw log content is unchanged.

Starting points: src/release39/developer.js.

### TS-040-24 — Process larger tabular previews responsively

Priority: P2 · Size: L · Status: Proposed

Scope: Profile CSV parsing and table rendering, then introduce worker-based chunk processing and virtualized previews where measurements justify them. Keep explicit bounded limits.

Acceptance: Compare peak memory, interaction delay and cancellation against a recorded baseline using fixed datasets; previews never silently truncate the exported result.

Starting points: src/workflows/csv.js; src/release39/data.js; tests/benchmark.mjs.

### TS-040-25 — Provide a guided device simulator

Priority: P2 · Size: M · Status: Proposed

Scope: Add a clearly labeled simulator to the separate Connection page for learning connection/send/receive/error flows without physical devices or an endpoint.

Acceptance: Demonstration payloads never reach a real transport; the user can practice permission denial, timeout and disconnect recovery with the same guide flow.

Starting points: src/connections/easy.js; src/connections/guides.js.

### TS-040-26 — Check saved profiles against connected capabilities

Priority: P2 · Size: M · Status: Proposed

Scope: After a user chooses a device, compare a saved BLE/USB parameter profile with its advertised services, characteristics or endpoints before enabling an operation.

Acceptance: Incompatible parameters are explained before a transfer; applying a profile still neither requests permission nor connects automatically.

Starting points: src/connections/session-tools.js; src/connections/bluetooth.js; src/connections/usb.js.

### TS-040-27 — Review regional OCR across a page batch

Priority: P2 · Size: L · Status: Proposed

Scope: Extend one-region reruns to a queue of selected page/region jobs, with individual before/after review and preservation of manual edits outside each selection.

Acceptance: Retry only failed regions; completed reviews remain intact, original images are unchanged and cancellation respects memory/output limits.

Starting points: src/workflows/media.js; src/workflows/image-batch.js.

### TS-040-28 — Prove redactions are removed from exported pixels

Priority: P1 · Size: M · Status: Proposed

Scope: Add verification fixtures that decode final raster exports and test redacted regions, transparency, flattening and unintended original-image/metadata retention.

Acceptance: Opaque redaction exports cannot reveal covered pixels through alpha or editable layers; unsupported export paths give a clear warning before download.

Starting points: src/workflows/media.js; tests/compatibility/media31.cjs.

### TS-040-29 — Review annotation placement after version changes

Priority: P2 · Size: L · Status: Proposed

Scope: Extend explicit page pairing with an optional reviewed annotation remapping step for revised documents. Keep original anchors and clearly identify uncertain matches.

Acceptance: No comment is moved automatically; additions/removals and moved pages retain a link to their original source and can be undone.

Starting points: src/release39/reviews.js; tests/pdf-review.browser.mjs.

### TS-040-30 — Validate the bytes produced by media exports

Priority: P2 · Size: M · Status: Proposed

Scope: Decode exported audio/images/video frames in test fixtures and verify actual duration, dimensions, channels or frame timestamp against the requested settings.

Acceptance: The report describes actual output properties; cancellation, boundary trims and variable-frame-rate fixtures do not produce silently incorrect exports.

Starting points: src/workflows/media.js; tests/compatibility/media31.cjs.

## Dependencies and delivery order

1. Foundation: 01–06. Freshness and behavior coverage should land before extending scenarios or increasing data limits.
2. Interaction: 07–12. Mobile, reader and TV checks need real-device/manual evidence in addition to browser automation.
3. Career: 15 first, then 17 and 13. Prototype 14/16 before promising full multilingual or accessible-PDF coverage; 18 depends on the final font representation.
4. Developer/data: 22 before expanding imports/exports; 19/20/23 can be separate changes. Profile 24 before raising any limits; 21 needs a lineage schema.
5. Connection/media: 26 builds on real capability behavior from 04; 25 is an explicit simulator. Keep 27/29 as reviewed workflows, with 28/30 providing output verification.

## Regression and completion requirements

- Preserve the approved workspace/route inventory and existing deep links. A rename or UI consolidation must retain compatibility rather than delete access.
- Capture a before-change baseline, implement focused meaningful tests, then run the complete regression suite for the release candidate. Run the existing Chromium/Firefox/WebKit matrix and published/offline checks.
- Test normal cached sessions as well as new contexts. Preserve entered data, Undo, project schemas and recovery across upgrades.
- Record physical Bluetooth/USB, real mobile, remote-only and screen-reader checks separately from simulations. A simulated pass cannot satisfy a physical-device acceptance criterion.
- Compare observable results with independent fixtures where possible; rendering a result alone is insufficient proof of correctness.
- Record source commit, affected routes, test results, known limits and completion date for each implemented item. Keep proposed, implemented, blocked and verified states distinct.
- Show file-format compatibility and accessibility evidence precisely; do not claim universal ATS support, universal script support or certified accessibility without corresponding evidence.

## Tracking template

For each item, record: owner · status · dependencies · design note · implementation PR · tests/evidence · remaining limitation · accepted date.

No application code, GitHub issues, deployment settings or release versions were changed while preparing this backlog.

