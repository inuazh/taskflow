import { useUsers } from "@/features/users/hooks/useUsers";
import { useState, type SyntheticEvent } from "react";
import { useCreateTask } from "../hooks/useCreateTask";
import { Button } from "@/components/ui/button";
// import type { CreateTaskParams } from "../api/createTask";

export function CreateTaskForm() {
  const [todo, setTodo] = useState("");
  const [userId, setUserId] = useState<number | "">("");

  const { data: users } = useUsers();
  const createMutation = useCreateTask();

  const handleSubmit =(e: SyntheticEvent <HTMLFormElement>)=> {
    e.preventDefault();
    if (!todo.trim() || userId === "") return

    createMutation.mutate({ todo, completed: false, userId: userId as number}, {
        onSuccess: () => {
            setTodo("")
            setUserId("")
        }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 items-center">
      <input
        className="bg-slate-800 px-3 py-2 rounded text-white border border-slate-700 flex-1"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="text"
      />
      <select
      className="bg-slate-800 px-3 py-2 rounded text-white border border-b-slate-700 " 
        value={userId}
        onChange={(e) =>
          setUserId(e.target.value === "" ? "" : Number(e.target.value))
        }
        name=""
        id=""
      >
        <option value="">select assignee...</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
      <Button type="submit">create</Button>
    </form>
  );
}
