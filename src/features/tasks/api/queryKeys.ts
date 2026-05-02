import type { GetTasksParams } from "./getTasks";

export const taskKeys = {
  all: ["tasks"] as const,

  list(params: GetTasksParams) {
    return ["tasks", "list", params] as const;
  },
};
