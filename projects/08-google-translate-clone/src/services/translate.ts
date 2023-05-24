import { FromLanguage, Language } from "../types"

export async function translate ({ sourceLanguage, targetLanguage, text }:
	{ sourceLanguage: FromLanguage, 
		targetLanguage: Language, 
		text: string 
	}) {


		const response = await fetch(`${import.meta.env.VITE_API_URL}/translate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: new URLSearchParams({
				'sourceLanguage': sourceLanguage,
				'targetLanguage': targetLanguage,
				'text': text
			})
		})
		
		const result = await response.json()
	
		const { translations } = result

		return translations[0].text
}