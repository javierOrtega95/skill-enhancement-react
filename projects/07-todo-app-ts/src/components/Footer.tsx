import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  handleFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue
}

export const Footer: React.FC<Props> = ({
  filterSelected,
  handleFilterChange
}) => {
  return (
    <footer className='footer'>
      <Filters filterSelected={filterSelected} handleFilterChange={handleFilterChange} />
    </footer>
  )
}
