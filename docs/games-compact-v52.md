# v52 compact Games and ready-together flow

Baseline: merged PR #25, main `df0557b540e7e68fa552d0c5e94cc856beac8d5c`.

Scope: the recommended five-item batch approved in this conversation. Request a break, opponent-approved Undo, changed-settings rematches, connection-quality indicators and progress portability remain backlog items. The four previously declined features remain excluded.

| Accepted item | Delivery | Verification |
| --- | --- | --- |
| TS-UI-02 Slim match bar | Player names, setup, current status, series score and timer share a wrapping header summary. Remote names are shown once; detailed game instructions remain in How to play. | All 15 games, narrow widths, retained turn/result feedback |
| TS-UI-03 Settings popup | Existing 44 × 44 px header gear opens a labelled desktop popup or phone bottom sheet. Native modal semantics, explicit focus cycling, Escape/Close/backdrop dismissal and return to gear. The live board stays in place; changing a game setting retains reviewed restart behavior. | Keyboard focus, board identity/state, six themes and accessible controls |
| TS-UI-04 Landscape layout | A container query places board and controls alongside each other only with sufficient actual card width. Smaller cards remain stacked; scrollable dense boards retain their own viewport. Rotation never changes game state. | 320/390/768/844/1440 px, portrait/landscape and offline output |
| TS-GAME-08 Both players Ready | Accepting an invitation creates a shared, disabled board. Each device separately confirms Ready after reviewing agreed settings. Only the host authorizes start after both current-match/current-lease signals. First turn and clock wait together. New series boards reset readiness. | All six remote games, both host seats, either Ready order, duplicates, cancellation, stale IDs/leases, timeout boundaries, recovery and native browser transport |
| TS-GAME-09 Optional move confirmation | Tab-only preference off by default. Eligible legal moves show an explicit local preview and Confirm/Cancel controls. Preview never commits/sends a move. Commit rechecks context and normal game rules; board/turn/lease changes, page hiding, settings/navigation and expiry invalidate it. | Local/Computer/Remote, keyboard Sliding, cancellation, stale contexts and one-time commit |

Supported previews: Tic-tac-toe placements, Connect Four drops, Reversi placements, Sliding tiles, Lights Out presses and Ludo token moves after a real roll. Dice rolls, private RPS choices and Memory flips keep their existing controls. Existing hints and Quick/Step-by-step guidance remain.

Settings opening pauses Snake as before. It does not pause an active remote clock; neither does move preview. The host checks expiry again before applying an action. The Ready screen shows agreed game/board size, first player, timer and single/best-of-three match type. Cancelling before start records no result. Draw/resign actions remain unavailable until play starts.

Readiness packets use protocol 5: both Games pages need v52. Existing QR security approval, shared-secret interrupted-match proof and both recovery consents remain required. Disconnecting an unstarted match clears both Ready signals; after recovery, both players must become ready again. Recovery of an already started board preserves its readiness and remaining clock allowance. Public-view consistency receipts and requested host snapshots remain in place.

All 84 workspaces, 139 routes including 105 legacy IDs, 15 games, six themes and v2 save/profile formats are retained. No dependency, account, theme or server is added. Preview preference is not serialized. Desktop WebRTC and simulated transport results do not certify actual Moto/Vivo cameras, Wi-Fi/hotspots, app switching or phone screen locks.

`npm run test:v52` adds logic/protocol and real UI cases to full regression and the native browser matrix. The PR records final exact-head regression and browser evidence. Existing gameplay fixtures now navigate the real settings overlay and explicitly complete Ready; dedicated v52 tests independently exercise the waiting and modal states.
