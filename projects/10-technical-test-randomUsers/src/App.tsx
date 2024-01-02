import { useEffect, useRef, useState } from 'react'
import './App.css'
import { API_URL } from './config'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string>('')

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

  const filteredUsers = users.filter(user => {
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })

  return (
    <>
      <h1>Technical test: random users</h1>
      <header>
        <button onClick={toggleColors}>
          Color rows: {colorRows ? 'on' : 'off'}
        </button>

        <button onClick={() => { setUsers(initialUsers.current) }}>
          Restore state
        </button>

        <input
          placeholder='Filter by counstry' onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />

      </header>
      <main>
        <UsersList users={filteredUsers} colorRows={colorRows} onDeleteUser={handleDeleteUser} />
      </main>
    </>
  )
}

export default App
