import { Header } from './components/Header'
import { Todos } from './components/Todos'
import { useTodos } from './hooks/useTodos'

const App: React.FC = () => {
  const { todos } = useTodos()
  return (
    <main className='todoapp'>
      <Header />
      <Todos todos={todos} />
    </main>
  )
}

export default App
