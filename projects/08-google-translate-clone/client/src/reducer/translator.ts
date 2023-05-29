import { AUTO_LANGUAGE } from '../constants'
import { type Action, type State } from '../types'

export const initialState: State = {
  sourceLanguage: 'auto',
  targetLanguage: 'EN',
  fromText: '',
  result: '',
  loading: false
}

export function translatorReducer (state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.sourceLanguage === AUTO_LANGUAGE || state.sourceLanguage === state.targetLanguage) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      result: '',
      sourceLanguage: state.targetLanguage,
      targetLanguage: state.sourceLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.sourceLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      sourceLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.targetLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      targetLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}
