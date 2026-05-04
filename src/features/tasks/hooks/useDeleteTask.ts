import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/deleteTask";
import { taskKeys } from "../api/queryKeys";
import type { TasksResponse } from "../api/types";


export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all });
      const previousData = queryClient.getQueriesData<TasksResponse>({
        queryKey: taskKeys.all,
      });

      queryClient.setQueriesData<TasksResponse>(
        { queryKey: taskKeys.all },
       (old)=> {
        if(!old) return old
         return {
            ...old,
            todos: old.todos.filter((task)=> task.id !== id),
        total: old.total -1,
            } 
        }
      );

      return {previousData}
    },

    onError: (_err, _params, context) => {
      if (!context?.previousData) return
      context.previousData.forEach(([key, data]) => {
        queryClient.setQueryData(key, data)
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  });
}
