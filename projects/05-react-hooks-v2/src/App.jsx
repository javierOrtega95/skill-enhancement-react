import { products } from './mocks/products.json'
import { Products } from './components/Products'
import { Header } from './components/Header'

function App () {
  return (
    <>
      <Header />
      <Products products={products} />
    </>
  )
}

export default App
