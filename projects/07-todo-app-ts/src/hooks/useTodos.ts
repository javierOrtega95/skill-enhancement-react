import { mockTodos } from '../mocks/todos'
import { type TodoList } from '../types'

export const useTodos = (): {
  todos: TodoList
} => {
  return {
    todos: mockTodos
  }
}
