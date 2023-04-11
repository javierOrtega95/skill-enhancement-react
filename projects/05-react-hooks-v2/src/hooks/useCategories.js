import { useState, useCallback, useEffect } from 'react'
import { searchCategories } from '../services/categories'

export function useCategories () {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = useCallback(async () => {
    try {
      setLoading(true)
      const newCategories = await searchCategories()
      setCategories(newCategories)
    } catch (e) {
      setLoading(false)
      console.log(e)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  return { categories, getCategories, loading }
}
