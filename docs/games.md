# Games and coach features — v44

Options → Games opens a separate page with fifteen games. Only the launcher runs in the tool document; the game code, styles, timers and optional game saves remain separate.

| Game | Features and coaching |
| --- | --- |
| 2048 | Keyboard, swipe and direction buttons, one-step Undo and a two-move expected-value coach favoring space, ordered rows and corner tiles. Random spawns prevent guaranteed outcomes. |
| Snake | Relaxed/Normal/Fast speed, pause/resume, collision detection and automatic pause when hidden/unfocused. The coach checks the next move and reachable escape space; it pauses before giving advice. |
| Memory Match | 6/8/12 pairs. The coach remembers only symbols the player has revealed, never hidden card identities. |
| Tic-tac-toe | Easy makes random legal moves; Medium takes immediate wins, blocks threats and prefers the center; Unbeatable searches complete continuations. Computer/local two-player modes, coaching and a match scoreboard. |
| Sudoku | Generated puzzles with verified unique solutions, notes, row/column/box conflict highlighting, keyboard/keypad input and reviewed hint placement. Hints distinguish single candidates from solver lookahead. Difficulty controls target clue counts, not a human technique rating. Generation and solving are bounded. |
| Minesweeper | 9×9/10 mines, 12×12/24 and 16×16/40. The first square and its neighbors are protected. Touch Flag mode and right-click flags. Coach deductions use visible clues and assume existing flags are correct; the coach declines when no forced move is visible. |
| Connect Four | Gravity, win/draw detection, solo/two-player modes and match scores. The computer takes wins and blocks threats before bounded 3-ply (Medium) or up to 6-ply (Hard) alpha-beta search. Easy chooses a random legal move after immediate tactics. Hard is not claimed to be unbeatable. |

| Reversi | Solo or two players, three computer difficulties, legal-move markers, automatic passes and a match scoreboard. Medium searches up to two plies; Hard and coaching search up to four with a 16,000-node budget. Evaluation favors corners and mobility and avoids vulnerable corner-adjacent squares. It is not unbeatable. |
| Sliding Puzzle | Solvable 3×3 and 4×4 boards, keyboard/touch movement, one-step Undo and bounded best-first coaching (up to 4,000 expansions). Partial-search recommendations explicitly do not guarantee optimal moves. The board always shows the empty square last in the goal. |
| Lights Out | 4×4 and 5×5 patterns generated from legal presses. A press toggles its own square and orthogonal neighbors. Coaching solves the current binary linear system and enumerates its nullspace to choose a shortest press set for the supported 4×4/5×5 boards. |
| Codebreaker | Four-digit codes with repeated digits, digits 1–4 / 1–5 / 1–6 and ten attempts. Exact/misplaced feedback handles duplicates without double-counting. The coach filters possible codes using only visible guess feedback, then compares the largest feedback groups for up to 80 candidate guesses. It never receives the hidden code in its worker request. |

| Rock–Paper–Scissors | First to three wins, random or pattern-learning opponent. The learning mode looks only at prior rounds and never reads the current throw. |
| Hangman | Bundled vocabulary/clues, length-based difficulty, 6–8 allowed mistakes, on-screen/physical keyboard and assisted letter reveals. |
| Word Scramble | Untimed rounds, uniquely indexed duplicate tiles, keyboard/touch editing, shuffle/clear and assisted prefix hints. |
| Ludo | Two/four local seats, computer or pass-and-play, four tokens each, legal move buttons and a board preview. Six to leave the yard; starts/stars safe; exact home entry; six/capture/home bonus; third consecutive six forfeits. No blockades. See the Guide for this variant’s rules. |

## Controls and progress

Fullscreen has an explicit Exit fullscreen button, including a browser fallback. Escape also exits the fallback. New game and difficulty changes ask before replacing an unfinished game. Switching games keeps session progress. Games starts in a compact searchable/filterable library. Choosing a game opens a separate play view. The collapsible left dock holds All games, Favorites, Resume, New game, How to play and Fullscreen. Settings is beside the game title, with an always-visible mode/difficulty summary; appearance and saving are available from the library header too. On phones an expanded dock is an overlay with keyboard focus containment, Escape/backdrop dismissal and focus restoration. Browser Back and game hash links work. Favorites, recents, dock preference and an independent choice among the six existing themes are stored only with opt-in Games saving. Reversi computer replies and expensive puzzle/code coaching run in the existing cancellable worker. Switching games or returning to the library cancels stale replies and Ludo timers. Snake pauses. Connect Four and Reversi can safely resume saved pending computer turns. A saved pending Reversi computer turn resumes safely; failed analysis offers a retry or Two players.

Optional Remember game progress and personal bests stores only Games data under the dedicated toolstudio-games-v2 key. It is off by default. When enabled, game settings, boards, best results and match scores resume after reload; Snake always resumes paused. Hints are counted and assisted bests remain separate. Bests are recorded at completion, with fewer moves preferred for puzzles and higher scores for 2048/Snake. Turning saving off stops automatic writes; Clear saved games removes only this dedicated key after confirmation. Game records are independent of tool workspace backups and reset controls.

Saved profiles and each board type are validated and size-bounded. Earlier v2 profiles retain every prior board and score; an empty Reversi scoreboard is added in memory. New validation rejects impossible sliding parity, invalid Undo boards, unsolvable light patterns, inconsistent code feedback and malformed Reversi turns. Invalid records remain untouched until the player explicitly clears them. Storage failures leave the current game playable and show an error.

Boards use keyboard labels, visible focus and system light/dark appearance. Dense Sudoku, Minesweeper and Connect Four boards can scroll on narrow screens so cells stay usable. No accounts, ads, external game scripts or network AI are used.

## Packaging

Source: src/games/catalog.js and library.js (arcade navigation), arcade-rules.js and word-bank.js (quick/word games), ludo.js and ludo-view.js (Ludo), src/games/engines.js (base rules), brain.js (coaching/puzzles/search), extras.js (the four new rule engines), saves.js (validation), app.js (UI). The small Options link is src/core/games-launcher.js.

Hosted games live at games/index.html. The stable Calc_Studio_Games.html launcher redirects there. Game assets are cached on use by the existing service worker and do not enter the main startup precache.

The offline companion offline/Calc_Studio_Games.html embeds all fifteen games and their styling. Keep it beside Calc_Studio_Offline.html for the offline Options link, or open it directly.

## Validation

npm run test:games covers rules, computer tactics, exhaustive Tic-tac-toe continuations, unique Sudoku puzzles, first-click protection, hints, saved-state rejection/recovery, completion records, keyboard/touch controls, fullscreen, responsive layouts, light/dark accessibility, opener isolation and offline use. The added games have rule, save and play-through coverage in `test:games-extra`, which also runs in the Chromium/Firefox/WebKit CI matrix. Existing tool and Connection regression suites remain required. Physical device certification is not claimed.

## v43 refinements and validation

Connect Four no longer rejects its own pending computer-turn saves; the player can retry a failed reply. Sudoku hints try hidden singles before lookahead, filled digits prune stale notes and arrows stop at the relevant row/column edge. Minesweeper numbered-cell chords respect visible flag counts and may lose when flags are wrong. Snake retains a valid direction for unknown input and ended boards do not advance. Tic-tac-toe still uses complete search, now favoring quicker wins. Reversi uses completed, equal-depth iterative search within its existing budget. Lights Out enumerates alternative solutions for a shortest press set.

`test:arcade` covers the new rules, full simulated Ludo games, invalid saves, earlier-profile migration, dock and separate views, favorites/search, scoring, word input, pending-turn recovery, timer cancellation, all-game viewport bounds, six-theme accessibility, reduced motion and offline games. It runs with all prior game regression and in the Chromium/Firefox/WebKit CI matrix. Existing tool-module source, theme identities and tool/category registries are preserved.

## v44 local play and reviewed logic

All fifteen games expose a same-device friends option in header Settings. Six have direct two/four-player play; nine have two-round individual challenges. See [the complete configuration and rules table](release-v44.md) for every game, private-choice behavior, challenge ranking, save migration and bounded strategy refinements. Online multiplayer is not implemented. `npm run test:play-setup` runs alongside every earlier Games suite.

The header uses a compact 44 × 44 px Game settings gear button in both the library and play views. Its tooltip and accessible name identify it; Enter/Space opens the existing options, and Escape returns focus to the gear. Difficulty, Computer/Local/Remote modes and appearance remain in those options.

See [v51 logic refinements](games-refinements-v51.md) for adaptive coaches, measured Sudoku ratings, progressive hints, stable board cells and explicit public-board consistency recovery. Both remote devices need v51.

See [v52 compact play and readiness](games-compact-v52.md) for the shared match bar, settings overlay, landscape controls, two-player Ready and optional move confirmation. Current remote pages require v52 / protocol 5.
