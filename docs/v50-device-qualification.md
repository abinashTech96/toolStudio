# v50 Android qualification

Status: awaiting physical Moto/Vivo testing. Automated Chromium, Firefox and WebKit checks exercise the real native browser transport in CI; the local fallback browser requires simulated transport. Neither certifies a phone, router, camera or screen-lock condition.

## Pairing directions

Record both phones’ model, Android/Chrome version, ToolStudio version, Wi-Fi/hotspot arrangement and the time of the test. Keep both pages open. Update both to v50 before testing Games together.

1. Create on Moto and join on Vivo by the two QR scans. Verify and approve the matching security code on both. Record success or export each device’s redacted connection report on failure.
2. Disconnect and start fresh. Create on Vivo and join on Moto. Repeat the same checks.
3. Repeat on the same Wi-Fi and on a phone hotspot. A failure with host-only candidates does not establish which phone or router blocked the route. Retain both redacted reports; do not expose raw pairing secrets.

## Gameplay and interruptions

1. Play each of the six remote games and confirm legal moves, turn cues, names, scores and final results agree. Review completed public board games on both screens.
2. Choose Friend starts and then Random player. Confirm the invitation states who starts; only that player can move, including across series rematches.
3. Agree on a 30-second timer. Confirm the same turn and remaining time. Wait without moving and verify exactly one timeout result and one score update.
4. Start a fresh timed match. Switch apps on either phone, then return. Record whether Chrome kept the page alive. Time must pause once the page reports hidden, and input must pause on both screens. A browser/process killed by Android cannot retain in-memory recovery.
5. Lock either screen and unlock it. Record actual behavior and whether the page was reloaded or discarded. Repeat with the other phone.
6. Disconnect mid-turn, re-pair while keeping the original pages open, and accept Continue interrupted match on both. Verify board, seats, series score and remaining turn allowance are retained. Neither player may resume through a late or cancelled confirmation.
7. Reload one phone during an interruption. Its in-memory recovery is expected to be lost; offer a new game without sending the old board to an unmatched page.

For every row record: direction, network, game/settings, expected behavior, observed behavior, report stage, pass/fail, tester and date. Do not mark the earlier Moto-to-Vivo issue fixed merely because the reverse direction or a desktop fixture passed.
