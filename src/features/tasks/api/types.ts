export type Task = {
    id: number,
    todo: string,
    completed: boolean,
    userId: number
}

export type TasksResponse = {
    todos: Task[],
    total: number,
    skip: number,
    limit: number
}