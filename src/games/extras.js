// Rules and bounded, local coaching for the additional Games collection.
const opposite = p => p === 'X' ? 'O' : 'X';
const rays = [-1, 0, 1].flatMap(y => [-1, 0, 1].filter(x => x || y).map(x => [x, y]));
export const extraInfo = {
  reversi: ['Reversi', 'TURN THE TABLES', 'Bracket opposing discs to flip them. X starts. A player with no legal move passes automatically; most discs wins when neither player can move.'],
  sliding: ['Sliding Puzzle', 'MAKE ROOM TO THINK', 'Slide a tile next to the empty square. Arrange the numbers in order, with the empty square last. Every generated board is solvable.'],
  lights: ['Lights Out', 'A LITTLE CHAIN REACTION', 'Press a square to toggle it and its horizontal and vertical neighbors. Switch every light off. The coach solves the current pattern.'],
  code: ['Codebreaker', 'FOLLOW THE EVIDENCE', 'Find the four-digit code in ten guesses. Digits can repeat. Exact means right digit and position; Misplaced means right digit in another position. Feedback does not identify individual digits.']
};

export function createReversi() {
  const board = Array(64).fill('');
  board[27] = board[36] = 'O'; board[28] = board[35] = 'X';
  return {board, turn: 'X'};
}
export function reversiFlips(board, cell, player) {
  if (!Number.isInteger(cell) || cell < 0 || cell >= 64 || board[cell]) return [];
  const flips = [], x = cell % 8, y = Math.floor(cell / 8);
  for (const [dx, dy] of rays) {
    const line = []; let c = x + dx, r = y + dy;
    while (c >= 0 && c < 8 && r >= 0 && r < 8 && board[r * 8 + c] === opposite(player)) {
      line.push(r * 8 + c); c += dx; r += dy;
    }
    if (line.length && c >= 0 && c < 8 && r >= 0 && r < 8 && board[r * 8 + c] === player) flips.push(...line);
  }
  return flips;
}
export function reversiMoves(board, player) {
  return board.flatMap((v, i) => !v && reversiFlips(board, i, player).length ? [i] : []);
}
export function reversiOutcome(board) {
  if (reversiMoves(board, 'X').length || reversiMoves(board, 'O').length) return null;
  const delta = board.filter(v => v === 'X').length - board.filter(v => v === 'O').length;
  return delta === 0 ? 'draw' : delta > 0 ? 'X' : 'O';
}
export function playReversi(state, cell) {
  const flips = reversiFlips(state.board, cell, state.turn);
  if (!flips.length) return null;
  const board = state.board.slice(); board[cell] = state.turn;
  for (const i of flips) board[i] = state.turn;
  const other = opposite(state.turn);
  return {board, turn: reversiMoves(board, other).length ? other : state.turn};
}
function reversiValue(board, player) {
  const other = opposite(player), end = reversiOutcome(board);
  if (end) return end === 'draw' ? 0 : end === player ? 100000 : -100000;
  let score = 5 * (reversiMoves(board, player).length - reversiMoves(board, other).length);
  for (let i = 0; i < 64; i++) if (board[i]) {
    const x = i % 8, y = Math.floor(i / 8);
    let weight = (x === 0 || x === 7) && (y === 0 || y === 7) ? 100 : x === 0 || x === 7 || y === 0 || y === 7 ? 8 : 1;
    for (const corner of [0, 7, 56, 63]) if (!board[corner] && Math.abs(x - corner % 8) <= 1 && Math.abs(y - Math.floor(corner / 8)) <= 1) weight = -25;
    score += board[i] === player ? weight : -weight;
  }
  return score;
}
export function reversiMove(board, player = 'O', level = 'medium', random = Math.random) {
  const moves = reversiMoves(board, player); if (!moves.length) return -1;
  if (level === 'easy') return moves[Math.floor(random() * moves.length)];
  let nodes = 0, choice = moves[0];const exhausted=Symbol('budget');
  function search(s,depth,alpha,beta){
    if(++nodes>16000)throw exhausted;
    if(!depth||reversiOutcome(s.board))return reversiValue(s.board,player);
    const choices=reversiMoves(s.board,s.turn);
    if(!choices.length)return search({...s,turn:opposite(s.turn)},depth-1,alpha,beta);
    const max=s.turn===player;let best=max?-Infinity:Infinity;
    for(const cell of choices){const value=search(playReversi(s,cell),depth-1,alpha,beta);best=max?Math.max(best,value):Math.min(best,value);if(max)alpha=Math.max(alpha,best);else beta=Math.min(beta,best);if(beta<=alpha)break}return best;
  }
  // Only replace the previous recommendation after every root move completes at the same depth.
  for(let depth=1;depth<=(level==='hard'?4:2);depth++){
    let best=-Infinity,next=choice;
    try{for(const cell of moves){const value=search(playReversi({board,turn:player},cell),depth-1,-Infinity,Infinity);if(value>best){best=value;next=cell}}choice=next}
    catch(error){if(error!==exhausted)throw error;break}
  }return choice;
}

export const slidingGoal = size => Array.from({length: size * size}, (_, i) => (i + 1) % (size * size));
export const slidingSolved = board => board.every((v, i) => v === (i + 1) % board.length);
export function slidingNeighbors(board, size) {
  const blank = board.indexOf(0), x = blank % size, y = Math.floor(blank / size);
  return [y ? blank - size : -1, x ? blank - 1 : -1, y < size - 1 ? blank + size : -1, x < size - 1 ? blank + 1 : -1].filter(i => i >= 0);
}
export function slidePuzzle(board, size, cell) {
  if (!slidingNeighbors(board, size).includes(cell)) return null;
  const next = board.slice(), blank = next.indexOf(0);
  [next[blank], next[cell]] = [next[cell], next[blank]]; return next;
}
export function slidingSolvable(board, size) {
  let inversions = 0;
  for (let i = 0; i < board.length; i++) for (let j = i + 1; j < board.length; j++) if (board[i] && board[j] && board[i] > board[j]) inversions++;
  return size % 2 ? inversions % 2 === 0 : (inversions + size - Math.floor(board.indexOf(0) / size)) % 2 === 1;
}
export function createSliding(level = 'medium', random = Math.random) {
  const size = level === 'hard' ? 4 : 3;
  let board = slidingGoal(size), previous = -1;
  for (let n = 0; n < ({easy: 16, medium: 50, hard: 100}[level]); n++) {
    const cells = slidingNeighbors(board, size).filter(i => i !== previous), blank = board.indexOf(0);
    board = slidePuzzle(board, size, cells[Math.floor(random() * cells.length)]); previous = blank;
  }
  if (slidingSolved(board)) board = slidePuzzle(board, size, slidingNeighbors(board, size)[0]);
  return {size, board, undo: null};
}
function manhattan(board, size) {
  return board.reduce((sum, v, i) => sum + (v ? Math.abs(i % size - (v - 1) % size) + Math.abs(Math.floor(i / size) - Math.floor((v - 1) / size)) : 0), 0);
}
export function slidingHint({board, size}) {
  if (slidingSolved(board)) return {cells: [], text: 'The puzzle is already complete.'};
  // A bounded best-first search; a partial search is explicitly not an optimal solution.
  const open = [], seen = new Map([[board.join(','), 0]]);
  function push(item) { open.push(item); let i = open.length - 1; while (i) { const p = (i - 1) >> 1; if (open[p].f <= item.f) break; open[i] = open[p]; i = p; } open[i] = item; }
  function pop() { const first = open[0], last = open.pop(); if (open.length) { let i = 0; while (i * 2 + 1 < open.length) { let c = i * 2 + 1; if (c + 1 < open.length && open[c + 1].f < open[c].f) c++; if (open[c].f >= last.f) break; open[i] = open[c]; i = c; } open[i] = last; } return first; }
  let best = null, solved = false;
  push({board, g: 0, h: manhattan(board, size), f: manhattan(board, size), first: -1});
  for (let count = 0; open.length && count < 4000; count++) {
    const current = pop();
    if (current.first >= 0 && (!best || current.h < best.h || current.h === best.h && current.g < best.g)) best = current;
    if (!current.h) { best = current; solved = true; break; }
    if (current.g >= 70) continue;
    for (const cell of slidingNeighbors(current.board, size)) {
      const next = slidePuzzle(current.board, size, cell), key = next.join(','), g = current.g + 1;
      if ((seen.get(key) ?? Infinity) <= g) continue;
      seen.set(key, g); const h = manhattan(next, size);
      push({board: next, g, h, f: g + h, first: current.first < 0 ? cell : current.first});
    }
  }
  const cell = best?.first ?? slidingNeighbors(board, size)[0];
  return {cells: [cell], text: 'Slide tile ' + board[cell] + (solved ? '. Bounded search found a path to the goal.' : '. Bounded search favors progress toward the goal; this move is not guaranteed optimal.')};
}

export function toggleLights(board, size, cell) {
  const next = board.slice(), x = cell % size, y = Math.floor(cell / size);
  for (const [dx, dy] of [[0, 0], [0, -1], [-1, 0], [0, 1], [1, 0]]) {
    const c = x + dx, r = y + dy; if (c >= 0 && c < size && r >= 0 && r < size) next[r * size + c] ^= 1;
  }
  return next;
}
export function lightSolution(board, size) {
  const n = board.length;
  const columns = Array.from({length: n}, (_, i) => toggleLights(Array(n).fill(0), size, i));
  const rows = board.map((v, r) => [...columns.map(c => c[r]), v]), pivots = [];
  let row = 0;
  for (let col = 0; col < n && row < n; col++) {
    const pivot = rows.findIndex((r, i) => i >= row && r[col]); if (pivot < 0) continue;
    [rows[row], rows[pivot]] = [rows[pivot], rows[row]];
    for (let i = 0; i < n; i++) if (i !== row && rows[i][col]) for (let j = col; j <= n; j++) rows[i][j] ^= rows[row][j];
    pivots.push(col); row++;
  }
  if (rows.some(r => !r.slice(0, n).some(Boolean) && r[n])) return null;
  const free=Array.from({length:n},(_,i)=>i).filter(i=>!pivots.includes(i));
  let best=pivots.filter((_,i)=>rows[i][n]);
  // The supported 4×4/5×5 boards have at most four free variables: enumerate all solutions.
  if(free.length<=12)for(let bits=0;bits<2**free.length;bits++){
    const vector=Array(n).fill(0);free.forEach((col,i)=>vector[col]=(bits>>i)&1);
    pivots.forEach((col,i)=>{vector[col]=rows[i][n];for(const f of free)vector[col]^=rows[i][f]&vector[f]});
    const candidate=vector.flatMap((v,i)=>v?[i]:[]);if(candidate.length<best.length)best=candidate;
  }return best;
}
export function createLights(level = 'medium', random = Math.random) {
  const size = level === 'easy' ? 4 : 5; let board = Array(size * size).fill(0);
  const cells = Array.from({length: board.length}, (_, i) => i);
  for (let n = 0; n < ({easy: 5, medium: 10, hard: 18}[level]); n++) {
    const i = Math.floor(random() * cells.length), cell = cells.splice(i, 1)[0]; board = toggleLights(board, size, cell);
  }
  if (!board.some(Boolean)) board = toggleLights(board, size, 0);
  return {size, board};
}
export function lightsHint({board, size}) {
  const solution = lightSolution(board, size);
  return {cells: solution?.length ? [solution[0]] : [], text: solution === null ? 'No solution exists for this pattern.' : !solution.length ? 'All lights are already off.' : 'Press the highlighted square. Linear algebra compared all solutions and found a shortest solution using ' + solution.length + ' remaining presses.'};
}

export function codeFeedback(secret, guess) {
  let exact = 0, misplaced = 0; const left = [], right = [];
  for (let i = 0; i < 4; i++) if (secret[i] === guess[i]) exact++; else { left.push(secret[i]); right.push(guess[i]); }
  for (const digit of left) { const i = right.indexOf(digit); if (i >= 0) { misplaced++; right.splice(i, 1); } }
  return {exact, misplaced};
}
export const codeWon = s => s.history.some(r => r.exact === 4);
export const codeOver = s => codeWon(s) || s.history.length >= 10;
export function createCode(level = 'medium', random = Math.random) {
  const colors = {easy: 4, medium: 5, hard: 6}[level];
  return {colors, secret: Array.from({length: 4}, () => 1 + Math.floor(random() * colors)), draft: [1, 1, 1, 1], history: []};
}
export function submitCode(state) {
  if (codeOver(state)) return null;
  return {...state, history: [...state.history, {guess: state.draft.slice(), ...codeFeedback(state.secret, state.draft)}]};
}
export function codeCandidates(colors, history) {
  const result = [];
  for (let n = 0; n < colors ** 4; n++) {
    let value = n; const guess = Array.from({length: 4}, () => { const digit = value % colors + 1; value = Math.floor(value / colors); return digit; });
    if (history.every(r => { const f = codeFeedback(guess, r.guess); return f.exact === r.exact && f.misplaced === r.misplaced; })) result.push(guess);
  }
  return result;
}
export function codeHint({colors, history}) {
  const possible = codeCandidates(colors, history);
  if (!possible.length) return {cells: [], text: 'No code matches this feedback.'};
  let guess = possible[0], best = Infinity;
  const tried = new Set(history.map(r => r.guess.join('')));
  const options = possible.filter(g => !tried.has(g.join('')));
  // At most 80 candidate guesses × 1,296 possibilities; never inspect the secret.
  for (let i = 0; i < Math.min(80, options.length); i++) {
    const candidate = options[Math.floor(i * options.length / Math.min(80, options.length))], buckets = new Map();
    for (const secret of possible) { const f = codeFeedback(secret, candidate), k = f.exact + ':' + f.misplaced; buckets.set(k, (buckets.get(k) || 0) + 1); }
    const cost = [...buckets.values()].reduce((sum, n) => sum + n * n, 0);
    if (cost < best) { best = cost; guess = candidate; }
  }
  return {cells: [], text: possible.length + (possible.length === 1 ? ' code remains' : ' codes remain') + ' consistent with your feedback. Try ' + guess.join(' ') + '. The coach compares possible feedback groups without reading the hidden code.'};
}
