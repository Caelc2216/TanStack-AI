import { useQuery } from "@tanstack/react-query"
import getEmployees from "./api"

export default function App() {
  const result = useQuery({queryKey: ['employees'], queryFn: getEmployees})
  return (
    <main>
      <h1>Employee Manager</h1>
      <p>Welcome! Ask Claude to start your TanStack Query lesson.</p>
      <p>Your first task will be to configure QueryClientProvider.</p>


    </main>
  )
}
