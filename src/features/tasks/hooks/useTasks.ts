import { useQuery } from "@tanstack/react-query";
import { getTasks, type GetTasksParams } from "../api/getTasks";
import { taskKeys } from "../api/queryKeys";


export function useTasks(params: GetTasksParams) {
  return useQuery({
    queryKey: taskKeys.list(params),
    queryFn:()=> getTasks(params),
  });
}
