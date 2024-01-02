import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { API_URL } from './config'
import { UsersList } from './components/UsersList'

declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string>('')
  const [sortByCountry, setSortByCountry] = useState(false)

  const initialUsers = useRef<User[]>([])

  useEffect(() => {
    fetch(`${API_URL}/?results=100`)
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results as User[])
        initialUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const toggleColors = () => {
    setColorRows(!colorRows)
  }

  const handleDeleteUser = (email: string) => {
    const newUsers = users.filter(user => user.email !== email)
    setUsers(newUsers)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const filteredUsers = users.filter(user => {
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })

  const sortedUsers = useMemo(() => {
    if (!sortByCountry) return filteredUsers

    return filteredUsers.toSorted((a: User, b: User) => {
      return a.location.country.localeCompare(b.location.country)
    })
  }, [sortByCountry, filteredUsers])

  return (
    <>
      <h1>Technical test: random users</h1>
      <header>
        <button onClick={toggleColors}>
          Color rows: {colorRows ? 'on' : 'off'}
        </button>

        <button onClick={toggleSortByCountry}>
          Sort by country: {sortByCountry ? 'on' : 'off'}
        </button>

        <button onClick={() => { setUsers(initialUsers.current) }}>
          Restore state
        </button>

        <input
          placeholder='Filter by country' onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <main>
        <UsersList users={sortedUsers} colorRows={colorRows} onDeleteUser={handleDeleteUser} />
      </main>
    </>
  )
}

export default App
