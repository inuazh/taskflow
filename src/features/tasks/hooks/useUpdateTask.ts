import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask, type UpdateTaskParams } from "../api/updateTask";
import { taskKeys } from "../api/queryKeys";
import type { TasksResponse } from "../api/types";
import { toast } from "sonner";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,

    onMutate: async (params: UpdateTaskParams) => {
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
                ? { ...task, todo: params.todo, userId: params.userId }
                : task,
            ),
          };
        },
      );

      return {previousData}
    },
    onError: (_err, _params, context) => {
      if (!context?.previousData) return;
      context.previousData.forEach(([key, data]) => {
        queryClient.setQueryData(key as readonly unknown[], data);
      });

      toast.error("failed to update task", {
        description: "pls try again",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}
