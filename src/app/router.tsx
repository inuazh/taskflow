import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
// import { UsersList } from "@/features/users/components/UsersList"
import { TaskList } from "@/features/tasks/components/TaskList"
import { CreateTaskForm } from "@/features/tasks/components/CreateTaskForm"
import { z } from "zod"
import { Toaster } from "sonner"

 /* eslint-disable react-refresh/only-export-components */
const tasksSearchSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    q: z.string().optional(),
})

const rootRoute = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="mb-6 text-3xl font-bold">TaskFlow</h1>
      <Outlet />
      <Toaster/>
      <TanStackRouterDevtools />
    </div>
  )
}

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: TasksPage,
  validateSearch: tasksSearchSchema,
});

function TasksPage() {
    const {page, q} = tasksRoute.useSearch()
  return (
    <>
     <h2 className="mt-8 mb-2 text-xl">create task</h2>
     <CreateTaskForm />

      <h2 className="mt-8 mb-2 text-xl">Tasks</h2>
      <TaskList page={page} q={q}/>
    </>
  );
}

const routeTree = rootRoute.addChildren([tasksRoute])

export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}