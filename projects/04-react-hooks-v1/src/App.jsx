import { useEffect, useState, useRef } from 'react';
// import { useRef } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      setError('Please enter a movie');
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const { movies } = useMovies();
  const { search, updateSearch, error } = useSearch();

  // const inputRef = useRef();

  const handleChange = event => {
    // Controlled vs. Uncontrolled
    // const data = new window.FormData(event.target)
    // const query = data.get('query')
    // const value = inputRef.current.value;
    const newSearch = event.target.value;
    updateSearch(newSearch);
  };

  return (
    <div className='page'>
      <header>
        <h1>Movies finder</h1>
        <form className='form'>
          <input
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='Star Wars, The Matrix..'
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
          />
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
