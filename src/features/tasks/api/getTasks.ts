import type { TasksResponse } from "./types"

export type GetTasksParams ={
    page: number
    limit: number
    q?: string
}

export async function getTasks(params: GetTasksParams): Promise<TasksResponse> {


    const {page, limit, q} = params

    const skip =  (page-1) *limit

    const url = q
        ? `https://dummyjson.com/todos/search?q=${q}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`

      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error("fetch error");
      }
    
      const data = (await response.json()) as TasksResponse;
      return data;
}