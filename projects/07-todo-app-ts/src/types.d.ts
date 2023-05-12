export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type TodoList = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
