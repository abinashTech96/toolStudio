# Edition 34 features

All 105 existing routes are retained. This release adds 18 workspaces, three categories and optional advanced panels inside existing tools. The topbar is unchanged.

## New workspaces

| Category | Workspace | Implemented workflow |
| --- | --- | --- |
| Developer, API & Automation | API Contract Studio | Import OpenAPI 3 JSON/YAML, explore endpoints, resolve local references, generate example payloads, validate responses with the existing schema engine and compare contracts |
| Developer, API & Automation | Code Migration Studio | Preview literal replacement rules, review changed files and export a ZIP without executing imported scripts |
| Data & Tables | Query Studio | Import JSON/CSV tables into local SQLite WASM, run read-only SQL, show query plans and export results |
| Data & Tables | Data Quality Studio | Review required/type/range/duplicate/cross-column rules and export row-level issues |
| Files, Images & Design | Document Comparison Studio | Compare PDF page text and rendered pixels, preview changed pages and download a report |
| Files, Images & Design | SVG & Vector Studio | Sanitize SVG, select shapes, edit properties, align/reorder, undo, and export optimized SVG |
| Math & Measurement | Simulation Studio | Seeded Monte Carlo distributions, safe arithmetic expressions, percentile summaries and assumption comparison |
| Text & Writing | Localization Studio | Review missing keys, placeholders, plural branches and terminology; generate missing-key templates |
| Career & Professional Documents | Portfolio Builder | Structured projects, local screenshots, sandboxed preview and standalone HTML export |
| Knowledge & Research | Research Notebook | Notes linked to sources, review, project files and Markdown export |
| Knowledge & Research | Citation Manager | Author-year/numbered citation drafts, RIS import/export and BibTeX export |
| Knowledge & Research | Evidence Board | Claims, sources and supporting passages with a reviewable evidence coverage matrix |
| Testing & Quality | Test Case Studio | Structured expected/actual comparison and boundary-case review |
| Testing & Quality | Fixture Builder | Reproducible schema-based fixtures with generated records checked against the schema |
| Testing & Quality | Coverage Matrix | Map requirements to cases and identify uncovered requirements |
| Systems & Architecture | Schema Designer | Validate table/relationship definitions, preview SQL DDL and render relationship diagrams |
| Systems & Architecture | Dependency Explorer | Review ordering, cycles and missing references; export Mermaid |
| Systems & Architecture | Capacity Planner | M/M/c queue estimates and server scenario comparison |

## Existing-tool improvements

| Area | Advanced panel |
| --- | --- |
| Integration Studio | Collections, reviewed request chains, extracted variables, pagination, assertions, request timeouts and masked project export |
| Salesforce Utilities | Uploaded describe metadata, field mapping, CRUD/FLS review checklist and dependency inspection |
| Log Analyzer | Multiple JSON-line log correlation, grouped errors, redacted export and execution metric comparison |
| JSON Studio | JSON tree and precise source pointers, reviewed pointer edits/transformation mappings and streamed NDJSON profiling |
| Data Workbench | Pivot, fuzzy matching, joins and streamed CSV profiles; reviewed application preserves existing Undo |
| Comparison Studio | Three-way comparison, numeric/date tolerances, explicit conflict choices and merged export |
| Functions & Graphs | Parameter sliders, scaled QR polynomial fitting, residual plots and coordinate export |
| Camera & Image Studio | Non-destructive layer recipes, masks, watermark placement, perspective guides and reviewed application with existing Undo |
| PDF Workspace | Metadata/form inspection and reviewed bookmarks, clickable contents and page-label export |
| Connection | Typed binary packets, byte order, checksum validation, bounded opt-in traffic capture, capture files and reviewed single-packet send |

## Shared controls

Open-workspace tabs retain mounted inputs. A collapsible task launcher provides common starting points. Workspace controls add text size, wrapping, column layout, explicit recipe review/application, opt-in text recovery and output inspection. Native outputs carry creation time and input revision; editing inputs marks results stale. Long jobs support cancellation and retry. Tables render 100 rows per page and keep scrolling inside the result.

Recipes, layouts and drafts integrate with existing backup validation and reset scopes. Cache reset clears native drafts; settings reset clears native layouts; full reset clears native saved state. Project files remain portable and are reviewed before replacing inputs. Stored credentials/emails detected by the redactor are masked, but users must still review content before sharing exports.

## Practical limits

- SQL is local and read-only, not a remote database connection. Table imports allow up to 50,000 rows, 100 columns and 250,000 cells within the aggregate byte budget. Result sets stop at 10,000 rows. Jobs have time limits and can be cancelled.
- Streamed CSV/NDJSON profiling is bounded at 100 MiB. Duplicate profiling samples the first 100,000 CSV rows; NDJSON error/field lists are bounded. It does not load a 100 MiB document into an editor.
- Contract references are local; external reference URLs are not fetched. Schema validation covers the existing engine's supported dialects. Migration rules are literal replacements rather than language-aware refactoring.
- PDF comparison supports up to 40 pages per file and bounded rendering resolution. Pixel changes can include font/rendering variation. Scanned page OCR remains in the existing tools. SVG editing includes path-data input but is not a full Bezier drawing application.
- Image base captures are limited to six megapixels. Guides are excluded from exported images. PDF forms are inspected; advanced export does not claim to preserve cryptographic signatures.
- Citation output is a draft for review, not a complete CSL style engine. Localization checks do not implement the full ICU MessageFormat grammar. Evidence checks organize supplied material rather than verify real-world claims.
- Residual bands describe observed spread rather than statistical confidence guarantees. Capacity assumes Poisson arrivals, exponential service times and equivalent parallel servers. Models and generated fixtures require review for the user's domain.
- Browser CORS and device permissions apply. Connections never start automatically. Packet replay requires a fresh explicit review and one send action; capture starts off and is bounded to 200 packets / 2 MiB.
- Hardware, cross-network WebRTC and platform-specific remote keys require real-device testing. Automated Bluetooth/USB checks use simulated adapters.
