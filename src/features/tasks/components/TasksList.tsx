import { useTasks } from "../hooks/useTasks";

export function TaskList() {
    const {data, isLoading, isError} = useTasks({page:1, limit: 10})

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