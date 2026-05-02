import { UsersList } from "@/features/users/components/UsersList";
import { TaskList } from "./features/tasks/components/TaskList";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="mb-6 text-3xl font-bold">TaskFlow</h1>
      <h2 className="mb-2 text-xl">Team</h2>
      <UsersList />

      <h2 className="text-x1 mt-8 mb-2">Tasks</h2>
      <TaskList />
    </div>
  );
}

export default App;
