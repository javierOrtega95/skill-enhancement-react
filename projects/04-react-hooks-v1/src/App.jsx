import debounce from 'just-debounce-it'
import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, searchError } = useSearch()
  const { movies, getMovies, loading, error } = useMovies({
    search,
    sort
  })
  // const inputRef = useRef();

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300),
    []
  )

  const handleChange = event => {
    // Controlled vs. Uncontrolled
    // const data = new window.FormData(event.target)
    // const query = data.get('query')
    // const value = inputRef.current.value;
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSubmit = event => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='Star Wars, The Matrix..'
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
          />
          <div>
            <input
              id='orderByTitle'
              type='checkbox'
              onChange={handleSort}
              checked={sort}
            />
            <label htmlFor='orderByTitle'>Order by title</label>
          </div>
          <button type='submit'>Search</button>
        </form>
        {searchError && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>{loading ? <p>loading...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
