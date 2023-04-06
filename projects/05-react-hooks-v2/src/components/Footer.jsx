import { useCart } from '../hooks/useCart'
import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer () {
  const { filters } = useFilters()
  const { cart } = useCart()
  const filteredCart = cart.map(product => {
    return { title: product.title, quantity: product.quantity }
  })

  return (
    <footer className='footer'>
      <h5>Shopping Cart con useContext & useReducer</h5>
      <div>Filters: {JSON.stringify(filters, null, 2)}</div>
      <div>Cart: {JSON.stringify(filteredCart, null, 2)}</div>
    </footer>
  )
}
