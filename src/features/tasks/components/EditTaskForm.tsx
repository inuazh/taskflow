import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTaskSchema, type EditTaskFormValues } from "../lib/editTaskSchema";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useUsers } from "@/features/users/hooks/useUsers";
import { Button } from "@/components/ui/button";
import type { Task } from "../api/types";

type EditTaskFormProps = {
  task: Task;
  onClose: () => void;
};

export function EditTaskForm({ task, onClose }: EditTaskFormProps) {

  const { data: users } = useUsers();
  const updateMutation = useUpdateTask();


  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditTaskFormValues>({
    
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      todo: task.todo,
      userId: task.userId,
    },
  });

  const onSubmit = (values: EditTaskFormValues) => {
    updateMutation.mutate(
      { id: task.id, ...values },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col gap-2"
    >
      <input
        {...register("todo")}
        className="bg-slate-800 px-3 py-2 rounded text-white border border-slate-700"
        placeholder="Task text"
      />
      {errors.todo && (
        <span className="text-red-400 text-sm">{errors.todo.message}</span>
      )}
      <select
        {...register("userId", { valueAsNumber: true })}
        className="bg-slate-800 px-3 py-2 rounded text-white border border-slate-700"
      >
        <option value="">select assignee...</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>

      {errors.userId && (
        <span className="text-red-400 text-sm">{errors.userId.message}</span>
      )}

      <div className="flex gap-2 mt-2">
        <Button 
          type="submit" 
          disabled={!isDirty || updateMutation.isPending}
        >
          Save
        </Button>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}