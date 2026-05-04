import type { Task } from "./types";

export async function deleteTask(id: number): Promise<Task> {
  const response = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("fetch error");
  }

  const data = (await response.json()) as Task;
  return data;
}
