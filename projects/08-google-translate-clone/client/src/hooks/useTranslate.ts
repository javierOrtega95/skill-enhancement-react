import { useEffect, useReducer } from 'react'
import { initialState, translatorReducer } from '../reducer/translator'
import { type FromLanguage, type Language } from '../types'
import { useDebounce } from './useDebounce'
import { translate } from '../services/translate'

export function useTranslate () {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(translatorReducer, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
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

    translate({ sourceLanguage: fromLanguage, targetLanguage: toLanguage, text: debouncedFromText })
    .then(result => {
      if (result == null) return
      setResult(result)
    }).catch(() => setResult('Error'))

  }, [debouncedFromText, fromLanguage, toLanguage])

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
