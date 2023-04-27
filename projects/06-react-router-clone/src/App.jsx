import { Route } from './components/Route'
import { Router } from './components/Router'
import Page404 from './pages/404'
import SearchPage from './pages/Search'

import { lazy, Suspense } from 'react'

const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

const appRoutes = [
  {
    path: '/',
    Component: LazyHomePage
  },
  {
    path: '/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/search' Component={SearchPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
