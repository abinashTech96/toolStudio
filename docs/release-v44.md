# v44 — Game setup in the header and local friends

Game settings now live beside the game title behind a labeled settings icon. An always-visible line reports the current play mode, difficulty/speed/board size and Ludo player count. The dock keeps navigation; it no longer contains Settings. The library has its own header Settings button for appearance and opt-in saving. Only the six existing themes are used.

## All fifteen games reviewed

| Game | Solo/computer configuration | Friends on one device |
| --- | --- | --- |
| 2048 | Classic rules (no artificial difficulty selector) | Two score attempts |
| Snake | Relaxed, Normal, Fast | Two score attempts at the same speed |
| Memory Match | 6, 8 or 12 pairs | Two players; score pairs, match keeps turn, miss passes |
| Tic-tac-toe | Easy, Medium, Unbeatable computer | Two players, X/O |
| Sudoku | Easy, Medium, Hard puzzle generation | Two puzzle attempts at the same setting |
| Minesweeper | Three board/mine settings | Two puzzle attempts at the same setting |
| Connect Four | Easy, Medium, Hard computer | Two players, X/O |
| Reversi | Easy, Medium, Hard computer | Two players, X/O with automatic passes |
| Sliding Puzzle | Gentle/mixed 3×3, mixed 4×4 | Two puzzle attempts at the same setting |
| Lights Out | 4×4 and two 5×5 patterns | Two puzzle attempts at the same setting |
| Codebreaker | Digits 1–4, 1–5 or 1–6 | Two code attempts at the same setting |
| Rock–Paper–Scissors | Random or pattern-learning computer | Private choices, handover, joint reveal, first to three |
| Hangman | Easy, Medium, Hard word lengths/mistake limits | Two word attempts at the same setting |
| Word Scramble | Easy, Medium, Hard word lengths | Two word attempts at the same setting |
| Ludo | Computer difficulty; 2 or 4 seats | Two/four players, pass-and-play |

Friends means same-device play. There are no rooms, network connections or remote opponents. Computer-only difficulty controls disappear in direct local matches; the actual board/speed/puzzle controls remain where relevant. No difficulty is invented for classic 2048.

Challenge rounds use separately generated boards/words at the same setting, not a certified equal-difficulty competition. A ready/handover screen hides the previous board. Completion outranks failure; among completed puzzles fewer hints, then fewer moves wins. If both puzzles are unfinished the result is a draw. Snake/2048 compare fewer hints first, then higher score; equal scores draw regardless of move count. End attempt/Finish round and a restart are explicit. Results stay separate from solo bests. Opt-in saving preserves round/score/board metadata; saves are validated and older v2 records remain supported.

RPS unrevealed choices exist only in memory, never in the DOM or save profile, and are discarded on navigation, visibility loss or reload. Finalized rounds retain the normal history and once-only match credit. Local Memory has no coach hints and records per-player pairs; navigating away during a miss closes cards and passes exactly once. Saved pending misses normalize to the following player's turn.

## Logic refinements

- Connect Four searches completed depths up to six plies with ordered wins, exact-value transposition caching and a 35,000-node budget; it never replaces a completed recommendation with partially searched root alternatives. Tactical wins/blocks remain first.
- Reversi orders corners, values mobility more in the opening/midgame and weights disc advantage late, retaining equal-depth iterative search and the 16,000-node bound.
- Minesweeper checks inconsistent flags and performs subset subtraction between visible numbered clues. Existing flags are assumed correct; covered mine identities are never used to choose a hint.
- Sliding Puzzle uses Manhattan distance plus disjoint linear conflicts and rejects stale heap entries. Search stays bounded to 4,000 expansions; partial recommendations do not claim optimality.
- Codebreaker minimizes the largest feedback bucket before expected ambiguity, using at most 80 candidate guesses against at most 1,296 possibilities and no hidden code input.
- Snake coaching checks next-step exits and penalizes space too small for its body. It remains advisory.
- RPS learning includes historical transitions after the previous hand; it never observes the current throw.
- Hard Ludo includes whole-team exposure changes and prioritizes an immediate full-game finish. Future dice are not predicted.
- Settings changes reset the selected board without retaining an obsolete session. Cancel leaves settings, the board and any completed first-player challenge result intact. Repeated identical Sudoku entries do not inflate move counts; asynchronous coaching blocks conflicting input.
- Existing complete Tic-tac-toe search, exact shortest Lights Out solutions, 2048 merge/spawn/Undo behavior, word tile identities and unique Sudoku generation remain covered by regression.

## Validation

`npm run test:play-setup` adds pure rules, score/round/save validation, adversarial visible-clue tests, all fifteen local modes, both-player actions, concealed choices, natural endings, cancellation, reloads, responsive header controls, six-theme accessibility and standalone offline coverage. It runs under `test:games` and independently in Chromium/Firefox/WebKit CI. All earlier tool, Connection, game and workspace regression suites remain enabled.
