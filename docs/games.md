# Games and coach features — v35.02

Options → Games opens a separate page with seven games. Only the launcher runs in the tool document; the game code, styles, timers and optional game saves remain separate.

| Game | Features and coaching |
| --- | --- |
| 2048 | Keyboard, swipe and direction buttons, one-step Undo and a two-move expected-value coach favoring space, ordered rows and corner tiles. Random spawns prevent guaranteed outcomes. |
| Snake | Relaxed/Normal/Fast speed, pause/resume, collision detection and automatic pause when hidden/unfocused. The coach checks the next move and reachable escape space; it pauses before giving advice. |
| Memory Match | 6/8/12 pairs. The coach remembers only symbols the player has revealed, never hidden card identities. |
| Tic-tac-toe | Easy makes random legal moves; Medium takes immediate wins, blocks threats and prefers the center; Unbeatable searches complete continuations. Solo/two-player modes, coaching and a match scoreboard. |
| Sudoku | Generated puzzles with verified unique solutions, notes, row/column/box conflict highlighting, keyboard/keypad input and reviewed hint placement. Hints distinguish single candidates from solver lookahead. Difficulty controls target clue counts, not a human technique rating. Generation and solving are bounded. |
| Minesweeper | 9×9/10 mines, 12×12/24 and 16×16/40. The first square and its neighbors are protected. Touch Flag mode and right-click flags. Coach deductions use visible clues and assume existing flags are correct; the coach declines when no forced move is visible. |
| Connect Four | Gravity, win/draw detection, solo/two-player modes and match scores. The computer takes wins and blocks threats before bounded 3-ply (Medium) or 5-ply (Hard) alpha-beta search. Easy chooses a random legal move after immediate tactics. Hard is not claimed to be unbeatable. |

## Controls and progress

Fullscreen has an explicit Exit fullscreen button, including a browser fallback. Escape also exits the fallback. New game and difficulty changes ask before replacing an unfinished game. Switching games keeps session progress.

Optional Remember game progress and personal bests stores only Games data under the dedicated toolstudio-games-v2 key. It is off by default. When enabled, game settings, boards, best results and match scores resume after reload; Snake always resumes paused. Hints are counted and assisted bests remain separate. Bests are recorded at completion, with fewer moves preferred for puzzles and higher scores for 2048/Snake. Turning saving off stops automatic writes; Clear saved games removes only this dedicated key after confirmation. Game records are independent of tool workspace backups and reset controls.

Saved profiles and each board type are validated and size-bounded. Invalid records remain untouched until the player explicitly clears them. Storage failures leave the current game playable and show an error.

Boards use keyboard labels, visible focus and system light/dark appearance. Dense Sudoku, Minesweeper and Connect Four boards can scroll on narrow screens so cells stay usable. No accounts, ads, external game scripts or network AI are used.

## Packaging

Source: src/games/engines.js (base rules), brain.js (coaching/puzzles/search), saves.js (validation), app.js (UI). The small Options link is src/core/games-launcher.js.

Hosted games live at games/index.html. The stable Calc_Studio_Games.html launcher redirects there. Game assets are cached on use by the existing service worker and do not enter the main startup precache.

The offline companion offline/Calc_Studio_Games.html embeds all seven games and their styling. Keep it beside Calc_Studio_Offline.html for the offline Options link, or open it directly.

## Validation

npm run test:games covers rules, computer tactics, exhaustive Tic-tac-toe continuations, unique Sudoku puzzles, first-click protection, hints, saved-state rejection/recovery, completion records, keyboard/touch controls, fullscreen, responsive layouts, light/dark accessibility, opener isolation and offline use. Existing tool and Connection regression suites remain required. Physical device certification is not claimed.
