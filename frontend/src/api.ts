// LESSON STAGE 2: Add employee API functions here.
// API base: http://localhost:3001
// GET /employees, GET /employees/:id, POST /employees,
// PUT /employees/:id, DELETE /employees/:id

async function getEmployees() {
  const response = await fetch("http://localhost:3001/employees")
  if(!response.ok) {
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
