import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../api/queryKeys";
import { getUsers } from "../api/getUsers";

export function useUsers() {
    return useQuery({
        queryKey: userKeys.all,
        queryFn: getUsers,
        staleTime: 1000 * 60 * 25, // люди меняюься редко, переопределяем дефолт
    })
}