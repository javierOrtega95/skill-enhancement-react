import { Language } from "../types"

export async function translate ({ targetLanguage, text }: { targetLanguage: Language, text: string }) {

	try {

		const response = await fetch(`${import.meta.env.VITE_API_URL}/translate?text=${text}&target_lang=${targetLanguage}`, {
			method: 'POST'
		})
		
		const result = await response.json()
	
		const { translations } = result

		return translations[0].text
		
	} catch (error) {
		console.error(error)
	}
	
}