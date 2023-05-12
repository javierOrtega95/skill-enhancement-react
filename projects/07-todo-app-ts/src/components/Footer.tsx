import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  handleFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue
  completedCount: number
  onClearCompleted: () => void
  activeCount: number
}

export const Footer: React.FC<Props> = ({
  filterSelected,
  handleFilterChange,
  completedCount,
  onClearCompleted,
  activeCount
}) => {
  const singleActiveCount = activeCount === 1
  const activeTodoWord = singleActiveCount ? 'todo' : 'todos'
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{activeCount}</strong> {activeTodoWord} pending
      </span>
      <Filters filterSelected={filterSelected} handleFilterChange={handleFilterChange} />
      {
        completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className='clear-completed'
          >
            Clear completed
          </button>
        )
      }
    </footer>
  )
}
