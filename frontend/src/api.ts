// LESSON STAGE 2: Add employee API functions here.
// API base: http://localhost:3001
// GET /employees, GET /employees/:id, POST /employees,
// PUT /employees/:id, DELETE /employees/:id

async function getEmployees(search?: string): Promise<Employee[]> {
  let url = "http://localhost:3001/employees"
  if(search != null && search != "")
  {
    url = url + `?name:contains=${encodeURIComponent(search)}`
  }
  const response = await fetch(url)
  if(!response.ok) {
    throw new Error("Error")
  }
  return response.json()
}

export async function getEmployee(id: string): Promise<Employee> {
  const response = await fetch(`http://localhost:3001/employees/${id}`)
  if (!response.ok)
  {
    throw new Error("Error")
  }
  return response.json()
}

export async function createEmployee(employee: Omit<Employee, 'id'>) : Promise<Employee>
{
  const response = await fetch(`http://localhost:3001/employees`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee)
  })

  if(!response.ok)
  {
    throw new Error("Error")
  }
  return response.json()
}

export async function updateEmployee(employee: Employee) : Promise<Employee>
{
  const response = await fetch(`http://localhost:3001/employees/${employee.id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee)
  })

  if(!response.ok)
  {
    throw new Error("Error")
  }

  return response.json()
}

export async function deleteEmployee(e_id: string)
{
  const response = await fetch(`http://localhost:3001/employees/${e_id}`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
  })

  if(!response.ok)
  {
    throw new Error("Error")
  }
}

export type Employee = {
  id: string
  name: string
  role: string
  department: string
}

export default getEmployees

