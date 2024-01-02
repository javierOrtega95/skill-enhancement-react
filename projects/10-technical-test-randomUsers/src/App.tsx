import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { API_URL } from './config'
import { UsersList } from './components/UsersList'

declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  LAST = 'last',
  COUNTRY = 'country',
}

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NONE)

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
    setSortBy(sortBy === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSortBy(sort)
  }

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    })
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sortBy === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a: User, b: User) => {
      const extractProperty = compareProperties[sortBy]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [sortBy, filteredUsers])

  return (
    <>
      <h1>Technical test: random users</h1>
      <header>
        <button onClick={toggleColors}>
          Color rows: {colorRows ? 'on' : 'off'}
        </button>

        <button onClick={toggleSortByCountry}>
          Sort by country: {sortBy === SortBy.COUNTRY ? 'on' : 'off'}
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
        <UsersList users={sortedUsers} colorRows={colorRows} onDeleteUser={handleDeleteUser} onSort={handleChangeSort} />
      </main>
    </>
  )
}

export default App
