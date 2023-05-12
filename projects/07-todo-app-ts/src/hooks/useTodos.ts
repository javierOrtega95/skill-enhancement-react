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

  return state
}

export const useTodos = (): {
  todos: TodoList
  filterSelected: FilterValue
  handleFilterChange: (filter: FilterValue) => void
} => {
  const [{ todos, filterSelected }, dispatch] = useReducer(reducer, initialState)

  const handleFilterChange = (filter: FilterValue): void => {
    dispatch({ type: 'FILTER_CHANGE', payload: { filter } })
    const params = new URLSearchParams(window.location.search)
    params.set('filter', filter)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
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
    handleFilterChange
  }
}
