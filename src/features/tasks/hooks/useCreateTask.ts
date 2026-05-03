import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "../api/createTask"
import { taskKeys } from "../api/queryKeys"

export function useCreateTask() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: taskKeys.all})
        }
    })
}