import { type SourceLanguage, type Language } from '../types'

export async function translate ({ sourceLanguage, targetLanguage, text }:
{ sourceLanguage: SourceLanguage
  targetLanguage: Language
  text: string
}) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      sourceLanguage,
      targetLanguage,
      text
    })
  })

  const result = await response.json()

  const { translations } = result

  return translations[0].text
}
