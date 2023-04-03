import { useId } from 'react'
import './Filters.css'

export function Filters () {
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  return (
    <section className='filters'>

      <div>
        <label htmlFor={minPriceFilterId}>Min Price:</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
        />
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select id={categoryFilterId}>
          <option value='all'>All</option>
          <option value='laptops'>Laptos</option>
          <option value='smartphones'>Smartphones</option>
        </select>
      </div>

    </section>

  )
}
