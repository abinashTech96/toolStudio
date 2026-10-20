# Games page

Options → **Games** opens a separate tab, following the Connection page pattern. The page offers:

- **2048**: merge equal tiles with arrows, swipes or direction buttons; score tracking and restart.
- **Snake**: keyboard/WASD, swipe and direction buttons; start/pause, collision detection, and automatic pause when hidden or unfocused.
- **Memory Match**: eight shuffled pairs, move count, mismatch review and completion state.
- **Tic-tac-toe**: play against a computer or a second player on the same device. The computer checks continuations to avoid a losing move.

The page has instructions, keyboard focus indicators, screen-reader labels, 48px controls, responsive boards and system light/dark appearance. There are no external scripts, accounts, ads, audio or tracking. Reloading discards game progress.

## Isolation and loading

The main application adds a small Options link, with noopener noreferrer. No game engine, game stylesheet, game timer or game storage runs in the tool document. Games do not use the Connection bridge, tool registry, workspace store or tool data. All 68 existing workspaces and 123 routes are retained.

Source lives in src/games/; pure rules are in engines.js. The separate launcher is src/core/games-launcher.js.

The build publishes games/index.html and its assets, plus Calc_Studio_Games.html as the stable hosted launcher. Games are cached on use by the existing service worker, so a previously opened page can reload offline. They are not added to the main startup precache.

The build also produces a self-contained offline/Calc_Studio_Games.html. Keep it next to Calc_Studio_Offline.html for the offline Options link to work. All game scripts and styles are embedded in the companion file; it can also open directly.

## Validation

Run npm run test:games for rule tests and browser checks: merge rules, no-op moves, terminal states, all possible human continuations against the computer, matching, growth/collisions, popup isolation, preserved input, paused timers, mobile bounds, accessibility and hosted/standalone offline use. Existing homepage, navigation, smoke, advanced, reliability, update, compatibility, budgets and Connection-server checks still apply.

Fresh local regression: **637 checks passed**, including 56 Games checks. All 68 workspaces and 123 tool routes remain available. Local browser checks used Chromium; physical hardware certification is not claimed.
