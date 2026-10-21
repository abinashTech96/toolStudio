# PDF review and shared workspace controls · v37.00

Open **Files, Images & Design → PDF Workspace → Read & review**. The existing PDF toolkit, form filler, metadata/navigation tools, OCR workflows and Document Comparison Studio remain available. No workspace or route is added or removed.

## Read and annotate

1. Choose a local PDF, or choose **Use first loaded PDF** to reuse the first PDF in the existing page toolkit. Review supports up to 30 MiB and 1,000 pages. PDF rendering/font engines load on demand.
2. Choose a page, fit width/page or a zoom percentage. **Rotate view** changes the reading view; the existing page toolkit controls exported page rotation. Layout chooses pages/document/notes, focused reading, notes only or page list. Resizing does not recreate your review.
3. Select an embedded text run, or choose **Drag a region** and drag over the page. Add a comment. With no selection, a comment is linked to the page. Image-only pages need the existing OCR workflow for searchable text.
4. Set the page decision to **not reviewed**, **needs changes** or **approved**. Filter the page list by decision. These decisions describe your review, not an automated judgment.
5. Resolve/reopen comments, locate their region or move an annotation to a newly selected region. **Undo review change** restores up to 30 changes. Notes display 20 at a time; thumbnails display 12 pages at a time and cache up to 36. Search lists the first 100 matching pages; narrow the term for more specific results.

Comments record a SHA-256 source checksum, page number, PDF-space rectangle and selected quote. Coordinates remain tied to the original page through view zoom/rotation. Review sessions keep Unicode text. Text selection follows embedded text runs; it is not full PDF text editing.

## Stamps and reviewed PDF export

Open **Place a stamp**. Choose Draft, Reviewed, Confidential or custom text, an optional explicit date, and 8–72 point text. The selected region determines placement; otherwise a region near the top of the PDF page is used. The text is fitted to that region. Region outlines in the reader are placement aids; **More → Preview reviewed PDF copy** renders the actual output for the selected page.

After previewing, choose **Export reviewed PDF copy**. Committed review edits invalidate the preview. Cancellation or source changes prevent an obsolete export from becoming downloadable. Unicode comments are native PDF Text annotations; readers differ in how they display/open them. Stamps are drawn using the bundled DejaVu font; unsupported stamp characters and regions outside a target page are reported before export. The original PDF bytes remain unchanged.

Stamps are annotations, not cryptographic signatures or secure redaction. Export rewrites a new PDF and does not preserve the validity of an existing digital signature. It does not remove original text/images.

## Version review and replacement files

For the existing full text/pixel comparison, open **Document Comparison Studio**, compare the original/revised files, then choose **Review comments in PDF Workspace**. The existing report and files are handed to the reader in memory. Review changes as open/resolved and inspect the current original/revised pages side by side. A comment on the same page provides the review detail. The reader also accepts a revised PDF for side-by-side inspection and explicit user-reported page changes; this does not claim to run an automatic comparison.

Loading a different PDF never silently transfers notes. The checksum must match. Under **More → Review replacement mapping**, approve a target page for every annotation. All page decisions reset. Annotations then require position verification on their target pages; move a region if necessary. Export remains blocked until verification is complete. Missing source files are reported when a saved session is reopened.

## Save, reopen and share

Work stays in memory until you explicitly choose **Save review on this device** or export a session. Save up to ten reviews, subject to the existing 750 KB shared saved-work limit and 500 KB per review. The existing conflict/recovery/backup/reset protections apply. Remove a saved review without deleting its source file or open review.

A review-session JSON contains document references, notes, selections, stamps, page decisions and version-review decisions. It does not contain PDF bytes. Keep the referenced PDF separately and relink it after reopening. Entered notes that have not been added are still drafts; add them before saving a session. Unsaved reviews/draft comments guard browser exit and the explicit update action.

Existing **Settings → Guided workflows → Bundle & selectively restore projects** includes saved PDF reviews. Expected source filenames are added to bundle references. Attach the source PDF explicitly to include it (existing project limits: 30 documents, 6 MB combined). The export review shows whether an attachment matches each review checksum. Selective restore treats PDF reviews as one saved workflow; original files retain their own independent checksum verification and download actions.

## Shared UI improvements

- Existing theme colors, consistent rounded controls, visible focus, primary/secondary/danger roles, read-only/error/disabled states and theme-aware scrollbars. Reduced motion and forced colors retain native fallbacks.
- **Find an option** supplements single selects with 20 or more options. The original native select/options remain intact. Search includes group names, supports disabled choices and pages 80 matches at a time. Escape/Cancel returns focus to the select; choosing an option dispatches its existing input/change events.
- Native and guided workspaces offer **Edit & result / Edit / Result**, stacked or side-by-side panes, and an editor-width slider. Controls retain the same DOM nodes, selected text, entered values and result freshness. Side-by-side adapts to stacked below 1,100 CSS pixels.
- Explicit pane preferences are tab-local and contain layout only. They clear through the existing settings/all reset flow. Existing saved layout/recovery controls remain available.
- Mobile/tablet controls use 48-pixel targets, safe-area padding, wrapped actions and viewport-bounded dialogs. PDF text-selection regions and specialist game grids retain their content-specific geometry; game grids scroll within their viewport.
- Connection and Games hosted/offline pages receive the shared control stylesheet. Existing permission, pairing, gameplay and fullscreen/normal-view flows remain unchanged.

## Verification and limits

`npm run test:pdf-ui` checks the review model, actual PDF/session/project exports, cancellation, source mismatch/remapping, rotated selection, comparison handoff, offline reading and shared UI behavior. Text extraction uses stream readers for Safari compatibility; cancellation coverage uses a fresh context and a delayed real PDF editor asset. Set `REVIEW_BROWSER=firefox` or `webkit` for the same browser tests. The normal CI workflow runs all three browsers and every existing suite.

The UI inventory opens all 69 workspaces at 390, 768 and 1,440 pixels and checks outer-page overflow; representative layouts cover 320–2,560 pixels, all six existing themes, reduced motion, large text, TV mode and focus restoration. Existing suites cover the 124 routes, specialist tool modes, updates, backups and processing. This is browser-emulated coverage. Physical TV/remote/stylus, mobile virtual keyboards and real phone/tablet certification still need device testing. Native dropdown menus and PDF annotation popups depend on the operating system/reader.
