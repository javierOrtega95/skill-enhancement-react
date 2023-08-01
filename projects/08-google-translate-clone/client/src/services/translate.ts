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

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  const result = await response.json()

  const { translations } = result

  const mappedTranslations = translations.map((translation: { text: string, detected_source_language: string }) => {
    return { text: translation.text, detectedSourceLang: translation.detected_source_language }
  })

  return mappedTranslations[0]
}
