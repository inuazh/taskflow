import { useTasksUiStore } from "../store/tasksUiStore";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Button } from "@/components/ui/button";

export function SelectionBar() {
  const selectedIds = useTasksUiStore((state) => state.selectedIds);
  const clearSelected = useTasksUiStore((state) => state.clearSelected);
  const deleteMutation = useDeleteTask();

  if (selectedIds.length === 0) return null;
  const handleDeleteAll = () => {
    selectedIds.forEach((id) => deleteMutation.mutate(id));
    clearSelected();
  };
  return (
    <div className="mb-4 flex items-center gap-4 rounded bg-slate-800 p-3">
      <span>Selected: {selectedIds.length}</span>
      <Button variant="destructive" size="sm" onClick={handleDeleteAll}>
        Delete selected
      </Button>
    </div>
  );
}
