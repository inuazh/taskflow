import type { Task } from "./types";

export type UpdateTaskParams = Omit<Task, "completed">;

export async function updateTask(
  params: UpdateTaskParams,
): Promise<Task> {
  const response = await fetch(`https://dummyjson.com/todos/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({todo: params.todo, userId: params.userId}),
  });

  if(!response.ok){
    throw new Error("fetch error")
  }

  const data = (await response.json()) as Task;
  return data
}
