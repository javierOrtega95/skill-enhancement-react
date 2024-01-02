import { useEffect, useState } from 'react'
import './App.css'
import { API_URL } from './config'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorRows, setColorRows] = useState(false)

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

  const toggleColors = () => {
    setColorRows(!colorRows)
  }

  return (
    <>
      <h1>Technical test: random users</h1>
      <header>
        <button onClick={toggleColors}>
          Color rows: {colorRows ? 'on' : 'off'}
        </button>
      </header>
      <main>
        <UsersList users={users} colorRows={colorRows} />
      </main>
    </>
  )
}

export default App
