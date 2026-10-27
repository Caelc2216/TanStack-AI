import { useQuery, keepPreviousData, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import getEmployees from "./api"
import { getEmployee, createEmployee, updateEmployee, deleteEmployee } from './api'
import { useState } from "react"

export default function App() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")
  const [employee_id, setEmployee_id] = useState<string | null>(null)
  const employees = useQuery({ queryKey: ['employees', { search }], queryFn: () => getEmployees(search), staleTime: 30_000, placeholderData: keepPreviousData })
  const employee_details = useQuery({ queryKey: ['employees', employee_id], enabled: employee_id != null, queryFn: () => getEmployee(employee_id!), staleTime: 30_000 })
  const [addEmployee, setAddEmployee] = useState(false)
  const createMutation = useMutation({ mutationFn: createEmployee, onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['employees'] }) }})
  const [editing, setEditing] = useState(false)
  
  const [new_name, setNewName] = useState("")
  const [new_dept, setNewDept] = useState("")
  const [new_role, setNewRole] = useState("")
  
  const [update_name, setUpdateName] = useState("")
  const [update_dept, setUpdateDept] = useState("")
  const [update_role, setUpdateRole] = useState("")
  
  const updateMutation = useMutation({mutationFn: updateEmployee, onSuccess: (updated) => {queryClient.setQueryData(['employees', updated.id], updated); queryClient.invalidateQueries({queryKey: ['employees']})}})
  const deleteMutation = useMutation({mutationFn: deleteEmployee, onSuccess: (_data, id) => {queryClient.removeQueries({queryKey: ['employees', id]}); setEmployee_id(null); queryClient.invalidateQueries({queryKey: ['employees']})}})

  return (
    <main>
      <h1>Employee Manager</h1>
      <button onClick={() => setAddEmployee((prev) => !prev)}>{addEmployee ? "Cancel" : "Add Employee"}</button>
      {addEmployee &&
        <>
          <div>
            <label>Name:</label>
            <input onChange={(event) => setNewName(event.target.value)} />
          </div>
          <div>
            <label>Department:</label>
            <input onChange={(event) => setNewDept(event.target.value)} />
          </div>
          <div>
            <label>Role:</label>
            <input onChange={(event) => setNewRole(event.target.value)} />
          </div>
          <button onClick={() => { createMutation.mutate({ name: new_name, department: new_dept, role: new_role }); setAddEmployee(false) }}>Save</button>
        </>}
      <div>
        <input onChange={(event) => setSearch(event.target.value)} placeholder="Search" />
        {employees.isFetching && !employees.isPending && <span>Getting new data...</span>}
      </div>
      <br />
      {employees.isPending && <p>Loading...</p>}
      {employees.isError && <p>We encountered an error</p>}
      {employees.data?.map((e) => (
        <button onClick={() => {setEmployee_id(e.id); setEditing(false)}} key={e.id}>{e.name}</button>
      ))}
      {employee_details.isPending && employee_id != null && <p>Loading Employee Details...</p>}
      {employee_details.isError && <p>We encountered an error</p>}
      {employee_details.isSuccess &&
        <>
          <h3>{employee_details.data?.name}</h3>
          <p>Department: {employee_details.data?.department}</p>
          <p>Role: {employee_details.data?.role}</p>
          <div>
          <button onClick={() => deleteMutation.mutate(employee_details.data.id)}>Delete</button>
          <button onClick={() => {setEditing((prev) => !prev); setUpdateName(employee_details.data.name); setUpdateDept(employee_details.data.department); setUpdateRole(employee_details.data.role)}}>{editing ? "Cancel" : "Edit"}</button>
          </div>
          {editing &&
            <>
              <div>
                <label>Name:</label>
                <input onChange={(event) => setUpdateName(event.target.value)} defaultValue={employee_details.data?.name} />
              </div>
              <div>
                <label>Department:</label>
                <input onChange={(event) => setUpdateDept(event.target.value)} defaultValue={employee_details.data?.department} />
              </div>
              <div>
                <label>Role:</label>
                <input onChange={(event) => setUpdateRole(event.target.value)} defaultValue={employee_details.data?.role} />
              </div>
              <button onClick={() => {updateMutation.mutate({id: employee_details.data.id, name: update_name, department: update_dept, role: update_role}); setEditing(false)}}>Update</button>
            </>}
        </>}



    </main>
  )
}
