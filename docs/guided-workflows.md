# Guided workflows — v36.00

Open an existing workspace. Use the **Guided workflows** shortcut at the top or expand its panel below the original controls. Choose a task; only that task’s editor is shown. Inputs stay separate until an explicit reviewed handoff or apply. No existing workspace, route or editor was removed.

## What is included

| Workspace | Guided capabilities |
| --- | --- |
| Integration Studio | Request order forms, variable origins/unresolved substitutions, response field assertions/extractions, handoff to the existing reviewed runner, saved run comparisons, offline failure scenarios, spreadsheet-to-API rehearsal, bug packs |
| Salesforce | Search uploaded describe metadata; Composite reference builder with inline issues and error explanations; type-aware field mapping; static Flow path review; Profile/PermissionSet XML comparison; payload rehearsal |
| Data Workbench | Shared dataset shelf; complete CSV/JSON loading; trim, numeric conversion, rename, filter, empty-row removal and deduplication steps; operation counts/history; reviewed apply with existing Undo; complete export |
| Quality / Query / Comparison | Select shared complete datasets; reviewed handoff to existing inputs; existing validation, SQL and comparison actions remain explicit |
| Migration Studio | ID/value matches, source/target counts and numeric totals, missing target relationships, row-level validation results |
| Image Studio | Form-based layers, visibility/locking/reordering, multi-selection alignment/equal gaps, reviewed preview/apply/PNG; existing OCR word-to-image region selection and correction; per-file image batch result/download/retry |
| Vector Studio | Multi-selection alignment/equal gaps; reviewed SVG source update. Rotated/skewed/reflected objects require flattening first. Existing sanitize/load remains explicit |
| PDFs / Documents / Archives | Expected-file checklist, chosen file order, SHA-256 duplicates, size checks and PDF page counts. Review a per-file page plan for duplicates, omitted pages and out-of-range numbers; use the existing PDF tools to apply page order |
| Kanban / Decision | Project notes/decisions/task links, deadlines, blocked reasons, entered-hour workload/capacity and keyboard-friendly bulk status editing |
| Calculation Notebook | Named inputs/linked formulas, supported SI units and compounds, dimensional checks, dependency links, explanatory errors; expected-result/tolerance formula regression |
| Finance | Monthly repayment-event projection, rate changes/extras/fees, explicit rounding/date assumptions, statement CSV/payment comparison |
| Test Case Studio / Fixtures / Coverage | Guided steps and expected/actual outcomes; saved failure history; selected JSON difference assertions; reviewed response fixtures |
| Schema / Dependencies | Field forms; baseline/proposed versions; rename/delete consumer impact; data preparation and migration review export; reviewed handoff to existing Schema Designer |
| Localization / Text | Translation grid, inline simple-placeholder mismatch/terminology feedback, reusable term list |
| Markdown | Heading outline/cursor navigation, reviewed saved research-note/citation insertion |
| Research / Citations / Evidence | Form-based sources/notes/claims, passages and document-page locators, opposing evidence, missing-reference and review reminders |
| Project Workspaces / Settings | Portable saved guided-work/dataset/document/layout bundles, verified file checksums, selective restore/conflict previews, missing document references, masked reproduction packs |

## Everyday workflow

1. Choose a guided task and enter records in its forms. Records collapse to a summary; Expand/Collapse visible records controls the current page. Search and paging display 25 records at a time; they do not truncate the underlying collection. **Alt+Insert** adds a record. Selection checkboxes support bulk actions. Raw JSON is under **Advanced**.
2. Run **Review**, **Validate**, **Inspect** or **Calculate**. Review the output; every source change invalidates prior apply/export approval.
3. Use the separate apply/export action where supplied. Applying to an existing editor asks before replacing its input. Existing API request execution still requires its own endpoint/method preview and approval.
4. Use **Save guided work on this device** for opt-in recovery. Saved work uses the existing validated backup/conflict/reset machinery. Loading saved work requires an explicit action. Unsaved forms remain in the current tab while switching tasks.

## Data safety and sharing

The shared dataset shelf is memory-only and accepts up to 50,000 rows, 200 columns and 4 MB per dataset. Workbench apply retains its existing limit of 10,000 rows / 200,000 cells; a larger result can be exported or shared instead. Transformation previews show at most 100 rows; operations and complete-data exports use every loaded row. The older advanced Workbench input now also starts with the complete Workbench source, rather than its first 100 rows.

Project bundles contain **saved** guided workflows, optionally shared datasets, selected local documents and workspace layouts. Save each workflow before bundling. Device-saved guided work is limited to 750 KB, within the existing 1 MB advanced-state limit; individual saved collections are bounded. Large datasets stay in memory and can be included directly in a portable bundle. Bundle limit: 12 MB JSON, at most 20 datasets and 30 documents totaling 6 MB. Documents are base64 encoded and verified against SHA-256 before restore. Selected documents download separately on restore. Bundles contain supplied content; review before sharing.

Restoration validates the combined state before writing it. Existing workflow/layout conflicts start unselected. Unselected saved work remains. Restored datasets are added as copies, and restored workflows load through each workflow’s **Load saved guided work** button. Layouts use the existing workspace layout settings; reopening/reloading may be needed for an already mounted workspace.

Cache/all reset releases shared datasets and file previews. All-data reset clears the guided editors and their saved state. Downloads already saved outside the application are unaffected.

## Interpretation and limits

- Failure Playground and spreadsheet rehearsal send zero requests. They model the entered policy/mappings, not server behavior.
- Salesforce Flow review reads supported element/connector XML. It does not execute conditions, records, permissions or transactions. A missing fault connector is a review prompt, not proof that a Flow is invalid. Permission differences describe supplied exports; they cannot establish full effective user access from incomplete metadata. Supported rights: object, field, user, Apex class/page and custom permissions.
- Unit formulas support finite numeric inputs, named variables, arithmetic, parentheses and integer powers from −6 to 6. Units: m/cm/mm/km, s/min/h, kg/g, N/Pa/J/W and compounds. Affine temperatures and general symbolic/CAS functions are outside this editor; the original math tools remain available.
- Repayment projections use monthly opening-balance interest, due-date fees/extras and two-decimal rounding. Statements may use different posting dates/daily accrual; results identify differences for review and do not certify lender calculations.
- Migration relationships are checked against the supplied target dataset’s keys. Multiple-table/live-database referential integrity is outside this offline report.
- Translation checks cover simple placeholders and printf tokens. Existing Localization Studio remains the tool for its richer ICU plural/select checks.
- Form checks inspect supplied definitions and provide a responsive local preview. They do not replace manual assistive-technology/device testing.
- Bug-pack masking covers recognizable secret patterns; review personal/free text manually before sharing.

## Source references

- [Salesforce Metadata API Developer Guide](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/api_meta.pdf)
- [Salesforce Flow connectors](https://help.salesforce.com/s/articleView?id=sf.flow_ref_connectors.htm&language=en_US)
- [Salesforce ObjectPermissions](https://developer.salesforce.com/docs/platform/field-reference/references/field-reference/salesforce-field-reference-objectpermissions.html)
- [Salesforce FieldPermissions](https://developer.salesforce.com/docs/platform/field-reference/references/field-reference/salesforce-field-reference-fieldpermissions.html)

Implementation: `src/guided/`, integrated through `src/advanced/runtime.js`; shared CSS is bundled into hosted and offline builds. `npm run test:guided` covers pure models and browser workflows, alongside all existing regression suites.
