# PDF review and device-wide UI backlog

Accepted: 2026-10-21

Status: accepted for planning. The user requested that the PDF review proposals be added to the list, together with UI optimization across devices. These items are not implemented by this backlog update. The completed v36.00 implementation and its regression evidence remain in PR #7.

## PDF Workspace: reading, review and annotation

Extend the existing PDF Workspace and its document-comparison features. Preserve merge/split, page rotation/order, form filling, navigation, OCR-related workflows, exports and all existing routes.

- PDF-01 — Page-linked comments: select text or a rectangular region and attach a note; retain document identity, page and selection coordinates. Flag comments needing review when their source document changes.
- PDF-02 — Review checklist: track each page as not reviewed, needing changes or approved; provide filters and counts. These are user-entered review decisions.
- PDF-03 — Version review: connect document-comparison results with comments; track open/resolved changes and show the relevant pages side by side. Review how comments map to a replacement document before applying that mapping.
- PDF-04 — Reusable stamps: Draft, Reviewed, Confidential and custom text/date stamps, with placement, size, preview, undo and reviewed export. Stamps are annotations, not cryptographic signatures or secure redaction.
- PDF-05 — Reading workspace: thumbnails, document search, selected-page canvas and page-linked notes; support fit-width/fit-page, zoom and a focused reading mode.
- PDF-06 — Saved review sessions: reopen document references, comments, selections and review progress; validate missing/replaced documents and integrate with the existing project-bundle workflow. Retain source files and export a reviewed copy.

Use one document canvas with a contextual toolbar. Show controls for the selected page, comment or stamp; group secondary commands under More. Reuse existing tools rather than creating overlapping main routes.

## UI optimization across all devices

### Device behavior

| Surface | Planned behavior |
| --- | --- |
| Mobile portrait | Compact header and searchable tool picker; one main pane at a time with clear Edit / Result / Notes switching; reachable primary actions, safe-area padding and no page-wide horizontal overflow. |
| Mobile landscape | Use available width without squeezing controls; retain selections, zoom, entered values and scroll position through rotation and keyboard changes. |
| Tablet | Adapt to portrait/landscape and split-screen widths; offer one-pane or adjustable two-pane layouts; support touch, stylus and hardware keyboard. |
| Laptop / desktop | Resizable editor/result panes, consistent compact actions and keyboard shortcuts; keep important actions visible without filling the page with buttons. |
| Ultrawide desktop | Bound reading/form widths; allow useful document/editor expansion and optional side panels; avoid stretching short inputs across the entire screen. |
| TV / remote | Larger readable controls and strong visible focus; predictable arrow-key navigation, focus restoration and an accessible Return to normal view control using the existing fullscreen exit flow. |

### Shared improvements

- UI-01 — Audit every workspace and its primary modes; identify duplicated controls, excess whitespace, confusing action order, overflow and hidden/unreachable commands before changing them.
- UI-02 — Establish consistent spacing, typography, control heights, editor sizing, contextual toolbars and primary/secondary/destructive action styling using existing theme tokens.
- UI-03 — Use a single primary action for the current task; group secondary commands under More and keep advanced settings/help collapsed. Preserve discoverability and all existing actions.
- UI-04 — Provide responsive one-pane/two-pane layouts and a focused Edit / Result view where appropriate. Persist explicit layout preferences without capturing document content.
- UI-05 — Keep touch targets at least 48 CSS pixels on mobile/tablet, including icon buttons and selection controls; do not require hover. Keep dangerous actions away from common navigation targets.
- UI-06 — Make dialogs, sheets and menus fit the usable viewport; support virtual keyboards, safe areas, long labels and large text. Restore focus after closing overlays.
- UI-07 — Preserve keyboard access, logical tab order, visible focus and accessible names. Adapt keyboard/remote interactions without intercepting normal editor typing or browser navigation.
- UI-08 — Improve tables and code editors: retain complete-data operations, bounded previews, column visibility, deliberate horizontal scrolling inside the component, readable wrapping options and clear row/selection counts.
- UI-09 — Maintain input, selection, result freshness, undo history and unsaved work when changing panes, resizing, rotating, entering/exiting fullscreen or navigating back.
- UI-10 — Reduce unnecessary rendering during typing, scrolling and resizing; load heavy views on demand, page/virtualize large collections where appropriate and release unused previews/resources.
- UI-11 — Apply consistent loading, empty, validation, stale-result and recovery states. Keep important messages beside their relevant inputs and announce status changes accessibly.
- UI-12 — Check all existing themes, high zoom and reduced-motion settings. Avoid decorative animations and preserve readable contrast and control states.
- UI-13 — Apply the same behavior to hosted and standalone offline builds, including the new guided workflows and existing Connection/Games pages where shared device conventions apply.
- UI-14 — Measure initial load, input responsiveness, scrolling and memory before/after changes; retain current lazy-loading and runtime/style budgets unless an explicit, measured adjustment is reviewed.

## Implementation order

1. Inventory existing controls and record device-specific issues; establish shared UI patterns and regression baselines.
2. Improve the shared shell, navigation, action placement, dialogs and editor/result layouts, preserving all routes and entered work.
3. Build the PDF reading/review canvas using those patterns; add comments/checklists, version review, stamps and saved sessions.
4. Roll the verified patterns through the remaining workspaces, with tool-specific adaptations for tables, code, images, audio and video.

This is a proposed sequence for the accepted backlog, not a runtime change or deployment authorization.

## Validation required when implemented

- Cover representative widths: 320, 390, 768, 1024, 1440, 1920 and 2560 CSS pixels; include portrait/landscape, tablet split-screen, and TV device mode. Treat actual TV/phone hardware verification separately from browser emulation.
- Check touch-only interaction, keyboard-only interaction, remote-arrow behavior, visible focus, 200%/400% zoom, large text, virtual keyboard and fullscreen exits where supported.
- Include accessibility scans and manual interaction checks; verify overflow, focus restoration and primary-action reachability.
- Verify source-file identity, annotation coordinates after zoom/rotation, Unicode notes, changed/missing documents, canceled/stale exports, and actual saved-session/PDF exports appropriate to the supported features.
- Preserve the existing workspace/route inventory and every original tool's behavior, data, backups and undo paths. Run focused tests plus the full regression suite against the final implementation.
- Recheck Chromium, Firefox and WebKit coverage, hosted/offline behavior, themes, large inputs and agreed performance budgets. Report unavailable physical-device coverage explicitly.

## Other candidate areas

Security & Privacy utilities and Personal Kanban/project scheduling remain candidate modules for later discussion. Their detailed scope has not been selected in this wave. Log Analyzer and Audio Editor proposals were declined and are not included in this accepted batch.
