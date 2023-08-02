import { useEffect, useReducer } from 'react'
import { translatorInitialState, translatorReducer } from '../reducer/translator'
import { translate } from '../services/translate'
import { type Language, type SourceLanguage } from '../types'
import { useDebounce } from './useDebounce'

export function useTranslate () {
  const [{
    sourceLanguage,
    targetLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(translatorReducer, translatorInitialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setSourceLanguage = (payload: SourceLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setTargetLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ sourceLanguage, targetLanguage, text: debouncedFromText })
      .then(result => {
        const { text, detectedSourceLang = 'auto' } = result
        setResult(text)
        setSourceLanguage(detectedSourceLang)
      }).catch((error) => {
        // TODO: handle error
        console.error(error)
      })
  }, [debouncedFromText, sourceLanguage, targetLanguage])

  return {
    sourceLanguage,
    targetLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setSourceLanguage,
    setTargetLanguage,
    setFromText,
    setResult
  }
}
