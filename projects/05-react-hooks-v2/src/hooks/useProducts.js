import { useState, useCallback, useEffect } from 'react'
import { searchProducts } from '../services/products'

export function useProducts () {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = useCallback(async () => {
    try {
      setLoading(true)
      const newProducts = await searchProducts()
      setProducts(newProducts)
    } catch (e) {
      setLoading(false)
      console.log(e)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  return { products, getProducts, loading }
}
