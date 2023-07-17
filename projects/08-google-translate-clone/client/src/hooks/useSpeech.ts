import { VOICE_TAG_FOR_LANGUAGE } from '../constants'
import { type Language } from '../types'

export function useSpeech ({ text, lang }: { text: string, lang: Language | 'auto' }) {
  const handleSpeak = () => {
    if (lang === 'auto') return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = VOICE_TAG_FOR_LANGUAGE[lang]
    speechSynthesis.speak(utterance)
  }

  return { handleSpeak }
}
