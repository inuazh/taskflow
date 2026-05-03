import type { Task } from "./types";

export type CreateTaskParams = {
  todo: string;
  completed: boolean;
  userId: number;
};

export async function createTask(params: CreateTaskParams): Promise<Task> {

  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("fetch error");
  }

  const data = (await response.json()) as Task;
  return data;
}
