import { useTasks } from "../hooks/useTasks";

type TaskListProps = {
    page: number,
    q?: string,
}

export function TaskList({ page, q }: TaskListProps) {
    const {data, isLoading, isError} = useTasks({page, limit: 10, q})

    if (isLoading) return <p>loading...</p>
    if (isError) return <p>error</p>
    if (data?.todos.length === 0) return <p>tasks is empty</p>



    return(
        <ul>
            {data?.todos.map((task) => (
                <li key={task.id}>
                    {task.todo}
                </li>
            ))}
        </ul>
    )
}