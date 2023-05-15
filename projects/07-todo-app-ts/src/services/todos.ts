import { type TodoList } from '../types'

const API_URL = 'https://api.jsonbin.io/v3/b/64627d6ab89b1e22999e5188'

export const fetchTodos = async (): Promise<TodoList> => {
  console.log(import.meta.env.VITE_API_BIN_KEY)

  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'X-Master-Key': import.meta.env.VITE_API_BIN_KEY
    }
  })

  if (!res.ok) {
    console.error('Error fetching todos')
    return []
  }

  const { record: todos } = await res.json() as { record: TodoList }
  return todos
}

export const updateTodos = async ({ todos }: { todos: TodoList }): Promise<boolean> => {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': import.meta.env.VITE_API_BIN_KEY
    },
    body: JSON.stringify(todos)
  })

  return res.ok
}
