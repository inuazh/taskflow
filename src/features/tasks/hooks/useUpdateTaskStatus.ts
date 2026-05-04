import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateTaskStatus,
  type UpdateTaskStatusParams,
} from "../api/updateTaskStatus";
import { taskKeys } from "../api/queryKeys";
import type { TasksResponse } from "../api/types";

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTaskStatus,
    onMutate: async (params: UpdateTaskStatusParams) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all });
      const previousData = queryClient.getQueriesData<TasksResponse>({
        queryKey: taskKeys.all,
      });
      queryClient.setQueriesData<TasksResponse>(
        { queryKey: taskKeys.all },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            todos: old.todos.map((task) =>
              task.id === params.id
                ? { ...task, completed: params.completed }
                : task,
            ),
          };
        },
      );
      return { previousData };
    },
    onError: (_err, _params, context) => {
      if (!context?.previousData) return;
      context.previousData.forEach(([key, data]) => {
        queryClient.setQueryData(key as readonly unknown[], data);
      });
    },
    onSettled: () => {
       queryClient.invalidateQueries({queryKey: taskKeys.all}) 
    }
  });
}
