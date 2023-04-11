import { Products } from './components/Products'
import { Header } from './components/Header'
import { useFilters } from './hooks/useFilters'
import { Footer } from './components/Footer'
import { IS_DEVELOPMENT } from './config'
import { CartProvider } from './context/cart'
import { Cart } from './components/Cart'
import { useProducts } from './hooks/useProducts'

function App () {
  const { filterProducts } = useFilters()
  const { products } = useProducts()

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
