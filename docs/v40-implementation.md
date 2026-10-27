# v40 tools and existing-workflow changes

This review implements the latest fifteen tool proposals plus the software changes from the thirty-item approved backlog. The live catalog has 84 workspaces and 139 routes in the existing 11 categories. The frozen v39 fixture checks that every previous workspace and all 124 previous routes remain present, including all 105 original routes.

`v40-status.json` maps each backlog item to its implementation and distinguishes software changes from pending physical/manual qualification. `v40-approved-backlog.md` preserves the approved requirements; it is historical planning text, not a current completion claim.

## New workspaces

| Tool | Implemented workflow and limits |
|---|---|
| 3D Model Inspector | Local STL/OBJ/self-contained GLB parsing, orbit/zoom, dimensions, wireframe and bounded degenerate-triangle inspection. 40 MiB and 500,000 triangles. External GLB resources are not fetched. Dimensions have no assumed physical unit. A WebGL capability failure preserves numeric inspection. |
| Circuit Playground | Ideal resistor/voltage-source DC node solving with power/current results and connectivity drawing; separate RC charging/discharging plots. Not a transistor/SPICE simulator. |
| Map & GeoJSON Studio | WGS84 point/line/polygon inspection, local SVG coordinate map, click drawing and GeoJSON export. Spherical distances/areas, polygon holes and explicit coordinate limits; no online basemap dependency. |
| Logic & Truth Table Studio | Boolean parser, truth tables, equivalence-preserving prime-implicant cover and 2–4 variable Karnaugh maps. Ten variables maximum; six-variable simplification does not promise globally minimum gate cost. |
| Screen Recording Studio | User-approved screen/window/tab capture, optional microphone/audio mixing, pause/resume, playback and native recorder export. Stops capture on leaving the workspace; browser permission/audio/codec support varies. Synthetic-capture tests exercise the real browser encoder; real permission UI remains manual. |
| GIF & Stop-Motion Maker | Ordered image frames, individual delays, resize/fit/background, looping GIF encoding, actual animation preview and download. 60 images/60 MiB source and 30 million combined output pixels. |
| Teleprompter | Script, speed, text size, mirror, progress, start/pause/reset and keyboard scrolling. Stops automatic scrolling when leaving. |
| Signal & Waveform Lab | Sine/square/triangle/saw composition, sampled plot, FFT spectrum, alias warnings, CSV samples and explicit low-volume playback. Bounded samples/FFT sizes. |
| File Recovery Inspector | File signature/hash inspection; PNG chunk CRC repair and JPEG trailing-byte removal on copies followed by decoding. Cannot restore deleted files, missing bytes or arbitrary corrupted documents. |
| Pattern & Texture Generator | Dots, grid, stripes, crosshatch and hexagon tiles, colors/spacing/stroke, SVG/CSS and flattened PNG export. |
| Timesheet & Worklog Studio | Manual entries and an explicit task timer, unique records, weekly/project totals and JSON/project export. Session-only until explicitly exported/recovered; no automatic background activity tracking. |
| Font & Typography Explorer | Local TTF/OTF specimens, glyph coverage, metrics and comparison; up to eight fonts. Faces are released with the preview. |
| Answer Sheet Checker | Structured keys and student answers, configurable marking, blank/uncertain classification and explicit correction of uncertain answers. No handwriting/OCR guessing. |
| Print Layout Studio | A4/Letter card/image grids, millimetre geometry, cutting guides, mirrored long-edge duplex backs, sandboxed preview and printable HTML. Printing requires actual-size settings and review of clipping/printer margins. |
| Read-Aloud Workspace | Device voice selection, local/network voice labels, rate/pitch, bookmark, highlighting and pause/resume/stop. Voice availability and boundary events depend on the installed voice service. |

The standalone guide contains entry and export instructions for each tool. New modules use the existing lazy workspace loader; heavy 3D and GIF code is not added to the initial shell.

## Existing workflows

- Recovery failures retain the previous IndexedDB transaction; save failure never becomes a Saved status. Retry handles blocked/open failures. A redacted records-only fallback explicitly excludes reusable file bytes; the existing portable bundle keeps those files.
- Calculation snapshots carry observed successful-run signatures, revisions and versions. Input edits invalidate verification. Pinning current verified scenarios requires a successful matching run; unverified snapshots can still be exported with an explicit note.
- Deferred editor controls preserve the live selection when they mount during focus. In WebKit this prevents select-all replacement from prepending new JSON to the old field content.
- Scoped reset affects only the current workspace/device view, split and action density. Existing text/projects and other device settings remain intact. Dialogs follow the visual viewport/safe areas. TV navigation adds directional focus and Back behavior while retaining native editing keys.
- Long native actions expose real progress where completed/total work is available. CSV preview parses in a cancellable worker; its complete result remains bounded by the existing 4 MB/50,000-row limits. Timing artifacts compare a fixed main-thread baseline and the worker workflow; they are environment-specific, not universal speed claims.
- Resume variants record a common master base and support explicit field/record conflict choices. Existing variants can establish a baseline without rewriting their content. Undo keeps the prior project.
- PDF export uses grapheme-based fallback and shaping across bundled DejaVu, Noto Devanagari and Noto Oriya fonts. Indic glyph outlines preserve visual shaping while a logical text layer retains extraction order. Actual PDF/DOCX bytes are checked for Latin, Hindi, Odia, Arabic, Hebrew, dates, bullets and links. Optional custom font attachments are explicit, chunked, bounded and checksum-verified.
- Word exports include heading/list styles and numbering. PDF exports include basic structure, headings, paragraphs and language. Link annotation tagging and actual reader behavior require manual qualification; no accessibility certification is claimed. Short resume entries and widow/orphan groups improve pagination.
- Collection preflight resolves inputs and reports missing variables/dependencies without sending. Metadata comparison explains supplied Salesforce field changes. Log alignment preserves original timestamps and flags ambiguous times rather than guessing a timezone.
- Reviewed joins, pivots and selected corrections record source hashes and exact source row references. Undo or subsequent data edits invalidate the current lineage proof. Other datasets support explicit user-supplied references; those are not automatically inferred or independently verified. Spreadsheet-safe CSV review exposes altered cells/headers; raw export remains available.
- Connection health includes a visibly separate offline simulator with no device/network operations. Saved BLE/USB profiles can be checked against connected capabilities before transfer; applying a profile still never connects automatically.
- Regional OCR queues preserve successful results, retry only failures and require individual approval. Approved non-overlapping regions with the same source snapshot merge per page on export; conflicting regions need review. Original page images remain unchanged.
- Raster proof decodes exported pixels, checks opaque coverage and rejects editable/vector or animated inputs and detected metadata containers. It is a bounded inspection of the supplied raster, not certification of unrelated project attachments. Export inspectors report decoded media dimensions/duration/channels; codec-specific frame timing needs appropriate source fixtures and review.
- PDF replacement remapping retains original/prior anchors, requires explicit target choices and later position verification, and continues to use the existing Undo.

## Verification

Run `npm run test:regression` for the complete 22-suite validation, including source/build checks, the existing tools, the new tools, route coverage, Connection server tests, offline/update checks and published output. The CI regression job runs real browser Connection pairing; the local sandbox run explicitly sets `CONNECTION_SKIP_REAL_RTC=1` because it has no usable ICE interfaces. The CI Chromium/Firefox/WebKit jobs also exercise PDF/UI, reliability, v40, v39 and workflow behavior. Final PR checks and uploaded test artifacts provide the result for the exact branch head.

The v40 tests include independent numerical fixtures, actual STL/OBJ/GLB and GIF parsing/encoding, real MediaRecorder output from an explicitly supplied synthetic canvas stream, recording pause/cancel/restart and late-picker cleanup, quota-failure recovery, OCR review and byte-level PDF/Word text extraction. Synthetic capture does not validate the operating-system permission picker. Capability skips are reported separately from passes.

Route coverage lists all 139 routes, distinguishes declared behavioral cases from navigation-only evidence and fails when a route is missing from the mapping. This does not claim exhaustive behavioral verification of every route.

Physical Bluetooth/USB, real on-screen keyboards, NVDA/VoiceOver and TV remote qualification remain pending in `v40-manual-validation.md`. Browser emulation and simulated adapters do not satisfy those manual criteria. No merge or deployment is performed by this change.
