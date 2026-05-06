import { createRootRoute, createRoute, createRouter, Outlet, useNavigate } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { TaskList } from "@/features/tasks/components/TaskList"
import { CreateTaskForm } from "@/features/tasks/components/CreateTaskForm"
import { z } from "zod"
import { Toaster } from "sonner"
import { SelectionBar } from "@/features/tasks/components/SelectionBar"
import { useGlobalUiStore } from "@/shared/store/globalUiStore"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useDebounce } from "@/shared/hooks/useDebaunce"

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
  const { page, q } = tasksRoute.useSearch()
  const navigate = useNavigate({ from: "/" })
  
  const density = useGlobalUiStore((state) => state.density)
  const setDensity = useGlobalUiStore((state) => state.setDensity)

  const [searchInput, setSearchInput] = useState(q ?? "")
  const debouncedSearch = useDebounce(searchInput, 300)

  useEffect(() => {
    navigate({
      search: {
        page: 1,
        q: debouncedSearch || undefined,
      },
    })
  }, [debouncedSearch, navigate])

  return (
    <>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="mb-4 w-full bg-slate-800 px-3 py-2 rounded text-white border border-slate-700"
      />

      <div className="mb-4 flex gap-2">
        <Button
          size="sm"
          variant={density === "compact" ? "default" : "secondary"}
          onClick={() => setDensity("compact")}
        >
          Compact
        </Button>
        <Button
          size="sm"
          variant={density === "comfortable" ? "default" : "secondary"}
          onClick={() => setDensity("comfortable")}
        >
          Comfortable
        </Button>
      </div>

      <h2 className="mt-8 mb-2 text-xl">create task</h2>
      <CreateTaskForm />

      <SelectionBar />

      <h2 className="mt-8 mb-2 text-xl">Tasks</h2>
      <TaskList page={page} q={q} />
    </>
  )
}

const routeTree = rootRoute.addChildren([tasksRoute])

export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}