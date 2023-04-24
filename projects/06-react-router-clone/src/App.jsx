import { Router } from './components/Router'
import Page404 from './pages/404'
import AboutPage from './pages/About'
import HomePage from './pages/Home'
import SearchPage from './pages/Search'

const appRoutes = [
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/about',
    Component: AboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App () {
  return (
    <main>
      <Router routes={appRoutes} defaultComponent={Page404} />
    </main>
  )
}

export default App
