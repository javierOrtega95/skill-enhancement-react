import { products } from './mocks/products.json'
import { Products } from './components/Products'
import { Header } from './components/Header'
import { useFilters } from './hooks/useFilters'
import { Footer } from './components/Footer'
import { IS_DEVELOPMENT } from './config'

function App () {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </>
  )
}

export default App
