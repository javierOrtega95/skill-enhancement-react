import { PRODUCTS_API_URL } from '../config'

export const searchCategories = async () => {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/categories`)
    const categories = await response.json()
    // TODO: handle errors
    return categories
  } catch (e) {
    throw new Error('Error searching categories')
  }
}
