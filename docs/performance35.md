# Edition 35: accuracy, performance and recovery

This release improves existing workspaces. It retains 123 routes (all 105 original routes), 68 workspaces, 11 categories and the original OCR assets. The topbar remains unchanged. No tool was removed.

| Area | Implemented changes |
| --- | --- |
| Numeric accuracy | Reject values that cannot round-trip through browser Number in advanced transformations; preserve unsafe Workbench integers as strings; preserve nested structured cells, missing fields, null, false and zero. Existing exact JSON tools remain available. |
| JSON validation | Duplicate keys, depth/value/size bounds and field/path/line errors. Repeated small valid documents use an eight-entry cache; callers receive independent values. |
| SQL | Reusable read-only database and worker; unchanged source imports and binary transfers are skipped. Duplicate result labels receive unique names. Large integer results remain text. Errors, cancellation and timeouts allow a fresh retry. |
| Preview integrity | Edited or cancelled jobs cannot publish a candidate for Apply. Declined Apply reports cancellation. Exports revalidate the reviewed revision after delayed engine loading, encoding and file preparation. Editing or revoking an approved API sequence stops following requests. |
| API substitution | Recursive typed substitution into objects and arrays; JSON encoding escapes substituted strings. Masked collection exports remain available. Requests are not automatically retried. |
| File input | Fatal text decoding, UTF-8/UTF-16 BOM detection and an explicit CSV encoding choice. Batch counts, aggregate bytes and stage-specific row/cell/page limits are checked before expensive work. |
| Saved work | Deduplicated, debounced workspace writes, explicit Saving/Saved/Failed states, quota retries, transaction rollback, recovery download/import, and reviewed cross-tab conflict resolution. Corrupt saved records are retained until explicit replacement. Backups include pending workspace state. |
| Startup | Whitespace-only minification of legacy hosted chunks; ordered initialization yields between work slices. Optional engines load on relevant actions; advanced extension controls load on expansion. Original helper serialization is retained. |
| Heavy processing | Advanced jobs use at most two reusable workers, a 45-second idle timeout, bounded progress updates, cancellation and retry. Pixel differences run off-thread with transferred buffers. PDF text uses explicit stream readers, including browsers without async stream iteration. |
| Memory | Closing native workspace tabs clears previews and source inputs remain available. SQL workers release on close. PDF previews use lazy blob URLs instead of retained data URLs; canvas/URL resources are released. Unchanged PDF comparisons and image layers reuse prior intermediates. |
| Tables | Union of columns, bounded cells and text previews, 100-row pages, row search, visible-column selection/search, page jump and complete CSV/JSON downloads. Preview limits do not trim downloads. |
| Device controls | Automatic editor sizing follows the device/global text preference; mobile automatic text is at least 16 px. Explicit workspace font sizes remain available. Dependent actions disable during processing while Cancel stays accessible. |
| Provenance | Report timestamps, duration, revision, input lengths/change fingerprints and file SHA-256 information. Files up to 20 MiB receive a full-file hash; larger files are explicitly labelled as first-1-MiB hashes plus metadata. |
| Updates | New service workers wait. A reviewed update action checks work/storage state and refuses activation while another application tab is open. Content-identical optional assets migrate to the new cache. |
| Diagnostics | Read-only bounded startup, long-task, action, input-frame, worker, DOM, heap and write counters. No input content or external telemetry is sent. |

## Explicit limits and behavior

- SQL supports up to 10 tables, 50,000 rows, 100 columns and 250,000 cells per table, 12 MB of table text and 10,000 result rows. SQLite decimal arithmetic remains floating point; SQL is not an arbitrary-precision finance engine.
- Workbench Apply supports 10,000 rows, 200 columns and 200,000 cells. Oversized results remain reviewable/downloadable where the producing tool permits them.
- NDJSON/CSV streaming supports 100 MiB, with 1 MiB lines/cells. NDJSON profiling checks structure and fields without using numeric values for calculations. Exact value editing rejects unsafe numeric tokens. CSV profiling counts unsafe numeric tokens separately and excludes them from extrema instead of rounding them.
- PDF comparison supports 40 pages and 20 MB per input, at most two million comparison pixels and five changed-page previews. The report retains all compared page summaries.
- Table rendering defaults to 20 visible columns and allows up to 50 at once; column controls show 50 choices per page. Full CSV uses every source column. Text/cell previews are bounded to 100,000/2,000 characters.
- Raw CSV preserves original formula-like text. The separate spreadsheet-safe export prefixes risky strings. Numeric negatives remain numeric. CSV cannot preserve JSON's missing-versus-null distinction; use JSON for that round trip.
- Source text fingerprints are non-cryptographic change indicators. Only the explicitly labelled SHA-256 file fields are content hashes.
- Legacy workspaces still share ordered startup registration; this is not complete lazy initialization of every original tool. Cancellation terminates advanced workers; synchronous legacy actions keep their existing limits.
- Browser mocks and emulated layouts do not certify physical Bluetooth/USB devices, phones, TVs or every browser implementation.

## Reproducible validation

Run `npm ci`, `npm run publish:root`, `npm run check`, `npm test`, `npm run test:advanced`, `npm run test:reliability`, `npm run test:updates`, `npm run test:compatibility` and `npm run test:budgets`. Run `python3 tests/server.py` after installing `Connection_Server/requirements.txt`. `node scripts/check.mjs --published` verifies that committed Pages/offline outputs match source.

The reliability browser suite runs Chromium locally. Set `BROWSER_MATRIX=chromium,firefox,webkit` after installing those Playwright browsers to repeat shared checks on all three. Chromium additionally runs CPU-throttled typing and garbage-collected heap checks. The GitHub validation workflow includes this matrix.

`npm run benchmark -- 5a2db5a87ee2b73e6782705f2c1c0b2c01506701` compares three fresh contexts per build against edition 34 using the same browser and local server. It records readiness, longest startup task and decoded JavaScript bytes. Timing results are environment-specific and are not physical-device performance claims.
