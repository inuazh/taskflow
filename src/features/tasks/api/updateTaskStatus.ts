import type { Task } from "./types";

export type UpdateTaskStatusParams = {
  id: number;
  completed: boolean;
};

export async function updateTaskStatus(
  params: UpdateTaskStatusParams,
): Promise<Task> {
  const response = await fetch(`https://dummyjson.com/todos/${params.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({completed: params.completed}),
  });

  if(!response.ok){
    throw new Error("fetch error")
  }

  const data = (await response.json()) as Task;
  return data
}
