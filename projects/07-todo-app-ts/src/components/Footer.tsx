import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  handleFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue
  completedCount: number
  onClearCompleted: () => void
}

export const Footer: React.FC<Props> = ({
  filterSelected,
  handleFilterChange,
  completedCount,
  onClearCompleted
}) => {
  return (
    <footer className='footer'>
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
