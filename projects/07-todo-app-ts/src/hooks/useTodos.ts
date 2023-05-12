import { useReducer } from 'react'
import { TODO_FILTERS } from '../consts'
import { mockTodos } from '../mocks/todos'
import { type FilterValue, type TodoList } from '../types'

const initialState = {
  todos: mockTodos,
  filterSelected: (() => {
    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search)
    const filter = params.get('filter') as FilterValue | null
    if (filter === null) return TODO_FILTERS.ALL
    // check filter is valid, if not return ALL
    return Object
      .values(TODO_FILTERS)
      .includes(filter)
      ? filter
      : TODO_FILTERS.ALL
  })()
}

type Action =
  | { type: 'FILTER_CHANGE', payload: { filter: FilterValue } }
  | { type: 'COMPLETED', payload: { id: string, completed: boolean } }
  | { type: 'REMOVE', payload: { id: string } }
  | { type: 'UPDATE_TITLE', payload: { id: string, title: string } }

interface State {
  todos: TodoList
  filterSelected: FilterValue
}

const reducer = (state: State, action: Action): State => {
  if (action.type === 'FILTER_CHANGE') {
    const { filter } = action.payload
    return {
      ...state,
      filterSelected: filter
    }
  }

  if (action.type === 'COMPLETED') {
    const { id, completed } = action.payload
    return {
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed
          }
        }

        return todo
      })
    }
  }

  if (action.type === 'REMOVE') {
    const { id } = action.payload
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id)
    }
  }

  if (action.type === 'UPDATE_TITLE') {
    const { id, title } = action.payload
    return {
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title
          }
        }

        return todo
      })
    }
  }

  return state
}

export const useTodos = (): {
  todos: TodoList
  filterSelected: FilterValue
  handleFilterChange: (filter: FilterValue) => void
  handleCompleted: (id: string, completed: boolean) => void
  handleRemove: (id: string) => void
  handleUpdateTitle: (params: { id: string, title: string }) => void
} => {
  const [{ todos, filterSelected }, dispatch] = useReducer(reducer, initialState)

  const handleFilterChange = (filter: FilterValue): void => {
    dispatch({ type: 'FILTER_CHANGE', payload: { filter } })
    const params = new URLSearchParams(window.location.search)
    params.set('filter', filter)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  const handleCompleted = (id: string, completed: boolean): void => {
    dispatch({ type: 'COMPLETED', payload: { id, completed } })
  }

  const handleRemove = (id: string): void => {
    dispatch({ type: 'REMOVE', payload: { id } })
  }

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    dispatch({ type: 'UPDATE_TITLE', payload: { id, title } })
  }

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) {
      return !todo.completed
    }

    if (filterSelected === TODO_FILTERS.COMPLETED) {
      return todo.completed
    }

    return true
  })

  return {
    todos: filteredTodos,
    filterSelected,
    handleFilterChange,
    handleCompleted,
    handleRemove,
    handleUpdateTitle
  }
}
