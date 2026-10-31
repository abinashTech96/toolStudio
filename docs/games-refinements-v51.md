# v51 Games logic and interaction refinements

Scope: the latest 16 approved refinements from this conversation. Earlier accepted backlog features remain planned unless separately delivered. Practice positions, Daily challenge, Mixed-game contest and Friendly tournaments remain excluded. Baseline: merged PR #24, commit 3079bd679e7748379445ee81917e5563292d2c37.

All 84 workspaces, 139 routes (105 legacy), 15 games, six themes and save/profile formats are retained. No dependency, account or signaling server is added.

| Goal | Delivery | Source / checks |
| --- | --- | --- |
| 1. Ludo decisions | Bounded expected-roll lookahead over captures, safe cells, home progress and bonus turns; future dice are enumerated, never predicted. Easy/Medium remain available. | ludo.js; arcade units; refinement units |
| 2. Connect Four tactics | Deeper completed-root searches, limited forced-threat extensions and small-endgame depth. Search remains bounded and approximate when interrupted. | brain.js; brain units/browser |
| 3. Reversi endgames | Small endgames request enough depth to finish through passes within a fixed node budget; larger boards use bounded search. No unbeatable claim. | extras.js; independent endgame oracle in refinement units |
| 4. Sudoku difficulty | Candidate puzzles are unique; generation compares a bounded set by supported human techniques. The measured rating is displayed, including a fallback when requested class is unavailable. Singles, hidden singles, naked pairs and box-line deductions precede solver lookahead. | reasoning.js; brain.js; unit/browser checks |
| 5. Minesweeper risk | Visible clue constraints, total mines and assumed-correct flags drive bounded exact-model risk. Hidden bombs are not sent to the risk worker. Large/exhausted frontiers return no partial probabilities. | reasoning.js; analysis-worker.js; refinement units |
| 6. Adaptive 2048 | Crowded boards request deeper chance-aware search; only a completed depth changes the recommendation. | reasoning.js; brain tests |
| 7. Snake routes | Bounded routes simulate the moving tail up to eight steps, stopping at current food; escape space and collision checks remain. Future safety is not guaranteed. | reasoning.js; brain/refinement units |
| 8. Codebreaker probes | Compare candidate answers and informative non-answer guesses; exact comparison for small candidate sets, bounded comparison otherwise. The secret is never read. | extras.js; independent feedback partitions in tests |
| 9. Sliding search | Bounded-memory iterative deepening with distance lower bounds. Completed paths are distinguished from approximate fallback suggestions. | reasoning.js; extras.js; short-path fixtures |
| 10. Word rotation | A bounded page-local bag rotates difficulty-pool IDs before repeating. It resets when the page closes; saved word IDs remain compatible. | reasoning.js; arcade-rules.js; bag units |
| 11. Progressive hints | Settings → Hint guidance → Step by step: clue, strategy, precise move. Quick suggestion remains the default. One analysis counts as one hint; placement is explicit and changing the game state invalidates guidance. | app.js; refinement browser/standalone checks |
| 12. Unavailable moves | Actual rule/turn state supplies control descriptions/tooltips and an explanation in How to play. | board-ui.js; browser checks |
| 13. Deciding moves | Actual winning lines for Tic-tac-toe/Connect Four; changed opposing discs highlighted for Reversi. A timed win never invents a board line. | board-review.js; pure/browser checks |
| 14. Stable boards | Matching live cells and controls are reused; handlers, values, selected cells and accessible names update without replacing the entire board. | board-ui.js; local/remote browser checks |
| 15. Disagreement recovery | Public-view diagnostic receipts supplement existing revision checks. A mismatch pauses both sides and the host clock. The joining device explicitly requests a fresh host snapshot; matching receipt resumes play. Old lease/request packets cannot authorize replacement. | remote-session.js; native remote browser + refinement units |
| 16. Timing boundaries | Exact-deadline loss, before-deadline turn reset, duplicate/late actions, hidden-page pauses and resync allowance preservation are covered. | games-refinements.unit.mjs; existing remote/clock suites |

## Limits and usage

Games → Settings → Hint guidance selects Quick suggestion or Step by step for this tab. It does not alter saved profiles. How to play includes move-rule explanations. Measured Sudoku difficulty appears with the game summary.

Both remote Games pages need v51 / protocol 4. Board digests detect accidental divergence; they are not authentication or anti-cheat proofs. Existing QR security approvals and both interrupted-match recovery consents remain required. The authoritative host supplies the board after the joining player requests Check match status. No recovery secret, private Memory deck or unfinished RPS choice is added to diagnostic receipts.

Actual phone, camera, Wi-Fi/hotspot, Moto/Vivo direction-specific connection and screen-lock qualification remain pending. Browser simulation/native desktop WebRTC does not certify those physical behaviors.

## Validation

The PR records final local regression results, browser matrix, exact head commit and CI links. Passing source checks alone is not a behavioral pass. The new test:game-refinements suite is included in full regression and both CI job definitions, with standalone/offline and all-six-theme browser checks.
