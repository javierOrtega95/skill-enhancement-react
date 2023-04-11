import { PRODUCTS_API_URL } from '../config'

export const searchProducts = async () => {
  try {
    const response = await fetch(PRODUCTS_API_URL)
    const json = await response.json()
    // TODO: handle errors
    return json.products
  } catch (e) {
    throw new Error('Error searching products')
  }
}
