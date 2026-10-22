// Shared pure rules used by the original board and the reviewed workload adapter.
export function taskDone(board,task){return !!task&&board.columns.find(c=>c.id===task.column)?.done===true}
export function taskBlocked(board,task){return (task.dependencies||[]).some(id=>!taskDone(board,board.tasks.find(t=>t.id===id)))||(task.subtasks||[]).some(s=>!s.done)}
