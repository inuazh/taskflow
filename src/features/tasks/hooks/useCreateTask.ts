import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask, type CreateTaskParams } from "../api/createTask"
import { taskKeys } from "../api/queryKeys"
import type { TasksResponse } from "../api/types"

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,

    onMutate: async (params: CreateTaskParams) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all })
      const previousData = queryClient.getQueriesData<TasksResponse>({
        queryKey: taskKeys.all,
      })
      const optimisticTask = {
        id: -Date.now(), 
        ...params,
      }
      queryClient.setQueriesData<TasksResponse>(
        { queryKey: taskKeys.all },
        (old) => {
          if (!old) return old
          return {
            ...old,
            todos: [optimisticTask, ...old.todos],
            total: old.total + 1,
          }
        },
      )

      return { previousData }
    },


    onError: (_err, _params, context) => {
      if (!context?.previousData) return
      context.previousData.forEach(([key, data]) => {
        queryClient.setQueryData(key, data)
      })
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: taskKeys.all })
    // },
  })
}