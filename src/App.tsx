import { UsersList } from "@/features/users/components/UsersList"

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="mb-6 text-3xl font-bold">TaskFlow</h1>
      <h2 className="mb-2 text-xl">Команда</h2>
      <UsersList />
    </div>
  )
}

export default App