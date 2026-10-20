# Tool Studio v35.02

Package version 35.2.0 produces the display label v35.02. Registry schema version 35 remains stable.

## Home

The root URL opens Home after a loading screen; tool content is hidden until initialization completes. Existing tool bookmarks still open the selected tool. Search results move directly below search and categories hide during a query.

Home and header Guide actions open the full guide page from Home; tool-specific help remains inside tools. The offline build embeds the full guide.

Includes Continue Working (explicit click), exact task shortcuts, reviewed file entry, recent saved-project review, favorite/category ordering, keyboard search and a network/cache/version footer. Home metadata uses the existing validated workspace store; no files or editor data are copied into its preferences. File handoff refuses unsupported/oversized files, asks before replacing input and aborts if inputs/navigation change during lazy loading.

## Updating

The notice displays the current and waiting application versions and waiting build ID. It explains that normal refresh retains the existing offline build. It remains visible on Home.

Activation still asks the user to save work, blocks active jobs/storage conflicts and checks other open Tool Studio tabs/windows. A blocked attempt shows the open-tab count and supports retry after closing the others. No editor is silently replaced.

## Games

See games.md for the seven independent games, coaching limits, optional progress, difficulty modes, fullscreen and offline packaging. All 68 existing workspaces and 123 tool routes are retained.

## Fresh local validation

744 checks passed, including 117 Games checks, 41 expanded homepage checks and 10 update-worker/UI checks. Detailed counts are in release-v35.02-validation.json. Local browser checks used Chromium; GitHub CI additionally runs the reliability suite in Firefox and WebKit. Physical hardware certification is not claimed.
