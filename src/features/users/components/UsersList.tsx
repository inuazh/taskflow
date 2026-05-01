import { useUsers } from "../hooks/useUsers";

export function UsersList() {
    const {data, isLoading, isError} = useUsers()

    if(isLoading) return <p>load...</p>
    if (isError) return <p>error</p>
    if (data?.length === 0) return <p>not data</p> 

    return (
        <ul>
            {data?.map((user) => (
                <li key={user.id}>
                    {user.firstName}
                </li>
            ))}
        </ul>
    )
}