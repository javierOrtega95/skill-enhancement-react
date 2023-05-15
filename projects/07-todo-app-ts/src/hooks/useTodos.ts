import { useEffect, useReducer } from 'react'
import { TODO_FILTERS } from '../consts'
import { type FilterValue, type TodoList } from '../types'
import { fetchTodos, updateTodos } from '../services/todos'

const initialState = {
  todos: [],
  sync: false,
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
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SAVE', payload: { title: string } }
  | { type: 'INIT_TODOS', payload: { todos: TodoList } }

interface State {
  todos: TodoList
  sync: boolean
  filterSelected: FilterValue
}

const reducer = (state: State, action: Action): State => {
  if (action.type === 'INIT_TODOS') {
    const { todos } = action.payload
    return {
      ...state,
      sync: false,
      todos
    }
  }

  if (action.type === 'FILTER_CHANGE') {
    const { filter } = action.payload
    return {
      ...state,
      sync: true,
      filterSelected: filter
    }
  }

  if (action.type === 'COMPLETED') {
    const { id, completed } = action.payload
    return {
      ...state,
      sync: true,
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

  if (action.type === 'SAVE') {
    const { title } = action.payload
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    return {
      ...state,
      sync: true,
      todos: [...state.todos, newTodo]
    }
  }

  if (action.type === 'REMOVE') {
    const { id } = action.payload
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => todo.id !== id)
    }
  }

  if (action.type === 'UPDATE_TITLE') {
    const { id, title } = action.payload
    return {
      ...state,
      sync: true,
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

  if (action.type === 'CLEAR_COMPLETED') {
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => !todo.completed)
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
  handleClearCompleted: () => void
  handleSave: (title: string) => void
  completedCount: number
  activeCount: number
} => {
  const [{ todos, filterSelected, sync }, dispatch] = useReducer(reducer, initialState)

  const handleFilterChange = (filter: FilterValue): void => {
    dispatch({ type: 'FILTER_CHANGE', payload: { filter } })
    const params = new URLSearchParams(window.location.search)
    params.set('filter', filter)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  const handleCompleted = (id: string, completed: boolean): void => {
    dispatch({ type: 'COMPLETED', payload: { id, completed } })
  }

  const handleSave = (title: string): void => {
    dispatch({ type: 'SAVE', payload: { title } })
  }

  const handleRemove = (id: string): void => {
    dispatch({ type: 'REMOVE', payload: { id } })
  }

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    dispatch({ type: 'UPDATE_TITLE', payload: { id, title } })
  }

  const handleClearCompleted = (): void => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) {
      return !todo.completed
    }

    if (filterSelected === TODO_FILTERS.COMPLETED) {
      return todo.completed
    }

    return true
  })

  useEffect(() => {
    fetchTodos()
      .then(todos => {
        dispatch({ type: 'INIT_TODOS', payload: { todos } })
      })
      .catch(err => { console.error(err) })
  }, [])

  useEffect(() => {
    if (sync) {
      updateTodos({ todos }).catch(err => { console.error(err) })
    }
  }, [todos, sync])

  return {
    todos: filteredTodos,
    filterSelected,
    handleFilterChange,
    handleCompleted,
    handleRemove,
    handleUpdateTitle,
    handleClearCompleted,
    handleSave,
    completedCount,
    activeCount
  }
}
