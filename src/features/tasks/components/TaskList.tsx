import { useTasks } from "../hooks/useTasks";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../api/getTasks";
import { taskKeys } from "../api/queryKeys";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { EditTaskForm } from "./EditTaskForm";
import { useTasksUiStore } from "../store/tasksUiStore";

type TaskListProps = {
  page: number;
  q?: string;
};

export function TaskList({ page, q }: TaskListProps) {
  const navigate = useNavigate({ from: "/" });
  const limit = 10;
  const { data, isLoading, isError, isFetching } = useTasks({ page, limit, q });
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteTask();
  const updateStatusMutation = useUpdateTaskStatus();

  const editingId = useTasksUiStore((state) => state.editingId);
  const setEditingId = useTasksUiStore((state) => state.setEditingId);
  const toggleSelected = useTasksUiStore((state) => state.toggleSelected);
  const selectedIds = useTasksUiStore((state) => state.selectedIds)

  useEffect(() => {
    if (!data) return;
    const totalPages = Math.ceil(data.total / limit);
    if (page >= totalPages) return;

    const nextParams = { page: page + 1, limit, q };
    queryClient.prefetchQuery({
      queryKey: taskKeys.list(nextParams),
      queryFn: () => getTasks(nextParams),
    });
  }, [page, q, data, queryClient]);

  useEffect(() => {
    if (!data) return;
    if (data.todos.length === 0 && page > 1) {
      navigate({ search: { page: page - 1 } });
    }
  }, [data, page, navigate]);

  if (isLoading) {
    return (
      <ul className="space-y-2">
        {Array.from({ length: limit }).map((_, i) => (
          <li key={i}>
            <Skeleton className="h-6 w-full bg-slate-700" />
          </li>
        ))}
      </ul>
    );
  }

  if (isError) return <p>error</p>;
  if (!data) return null;
  if (data.todos.length === 0 && page === 1) return <p>tasks is empty</p>;
  const totalPages = Math.ceil(data.total / limit);

  return (
    <>
      <div className="mb-2 h-5 text-sm text-slate-400">{isFetching && "Updating..."}</div>
      <ul className="space-y-1">
        {data.todos.map((task) => (
          <li key={task.id} className="flex items-center justify-between gap-2 py-1">
            {editingId === task.id ? (
              <EditTaskForm task={task} onClose={() => setEditingId(null)} />
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(task.id)}
                  onChange={() => toggleSelected(task.id)}
                  className="mr-2"
                />
                <input
                  type="checkbox"
                  checked={task.completed}
                  disabled={updateStatusMutation.isPending}
                  onChange={(e) =>
                    updateStatusMutation.mutate({
                      id: task.id,
                      completed: e.target.checked,
                    })
                  }
                />
                <span className="flex-1">{task.todo}</span>
                <Button size="sm" variant="secondary" onClick={() => setEditingId(task.id)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(task.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-4">
        <Button disabled={page === 1} onClick={() => navigate({ search: { page: page - 1 } })}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => navigate({ search: { page: page + 1 } })}
        >
          Next
        </Button>
      </div>
    </>
  );
}
