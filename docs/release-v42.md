# v42 · Four more games

The separate Games page now includes eleven games. The original seven games, 84 tool workspaces, 139 routes and six existing themes remain available.

The additions are Reversi (computer/two-player, legal moves, passes and scores), Sliding Puzzle (solvable 3×3/4×4 boards, Undo and bounded search coaching), Lights Out (solvable 4×4/5×5 patterns and algebraic hints) and Codebreaker (duplicate-aware feedback, ten attempts and feedback-only coaching). See `games.md` for controls and honest search limits.

The game picker uses compact buttons on desktop and one horizontally scrollable row on phones. Selecting a game or resizing keeps its button visible. Added transitions respect system reduced motion. Light/dark appearance uses the existing Games palette.

The new rules live in `src/games/extras.js`, outside the main tool runtime. Expensive hints and Reversi computer turns use the existing cancellable analysis worker. A cancelled reply cannot modify another game's board. The standalone offline Games file embeds the same engines and worker.

Saving remains opt-in under `toolstudio-games-v2`. Earlier profiles gain only an empty Reversi scoreboard; prior boards, settings, scores and unrelated tool records are retained. New saves validate puzzle parity, Undo adjacency, light-pattern solvability, code feedback and Reversi turns. Assisted bests stay separate, failed Codebreaker rounds do not earn bests, and match completions are credited once.

Validation includes 22 added rule/save checks and browser play-throughs covering legal moves, computer replies, cancellation, coaching, settings, keyboard/touch actions, Undo, scoring, earlier-save compatibility, reloads, 320–1920 px layouts, light/dark accessibility, reduced motion and offline play. The added suite runs alongside all existing game/tool regressions and in the Chromium/Firefox/WebKit CI matrix. Full CI outcomes are recorded on the pull request. Physical touch devices, TV remotes and frame-rate qualification remain manual checks.
