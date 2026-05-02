import { useTasks } from "../hooks/useTasks";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

type TaskListProps = {
  page: number;
  q?: string;
};

export function TaskList({ page, q }: TaskListProps) {
  const navigate = useNavigate({ from: "/" });


  const limit = 10;

  const { data, isLoading, isError } = useTasks({ page, limit, q });

  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>error</p>;
  if (!data) return null;
  if (data.todos.length === 0) return <p>tasks is empty</p>;

  const totalPages = Math.ceil(data.total / limit);

  return (
    <>
      <ul>
        {data.todos.map((task) => (
          <li key={task.id}>{task.todo}</li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-4">
        <Button
          disabled={page === 1}
          onClick={() => navigate({ search: { page: page - 1 } })}
          className="disabled:opacity-50"
        >
          Previous
        </Button>

        <span>
          Page {page} of {totalPages}
        </span>

        <Button
          disabled={page === totalPages}
          onClick={() => navigate({ search: { page: page + 1 } })}
          className="disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </>
  );
}
