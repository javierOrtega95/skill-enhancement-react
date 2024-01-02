import { useEffect, useState } from 'react'
import './App.css'
import { API_URL } from './config'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch(`${API_URL}/?results=100`)
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results as User[])
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <h1>Technical test: random users</h1>
      <main>
        <UsersList users={users} />
      </main>
    </>
  )
}

export default App
