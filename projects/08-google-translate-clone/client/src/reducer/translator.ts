import { AUTO_LANGUAGE } from '../constants'
import {
  type Action,
  type State
} from '../types'

export const updateLocalStorage = (state: State) => {
  window.localStorage.setItem('translator', JSON.stringify(state))
}

const initialState: State = {
  sourceLanguage: 'auto',
  targetLanguage: 'EN',
  fromText: '',
  result: '',
  loading: false
}

export const translatorInitialState: State = JSON.parse(localStorage.getItem('translator') as string) ?? initialState

export function translatorReducer (state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (
      state.sourceLanguage === AUTO_LANGUAGE ||
      state.sourceLanguage === state.targetLanguage
    ) {
      return state
    }

    const loading = state.fromText !== ''

    const newState = {
      ...state,
      loading,
      result: '',
      sourceLanguage: state.targetLanguage,
      targetLanguage: state.sourceLanguage
    }

    updateLocalStorage(newState)

    return newState
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.sourceLanguage === action.payload) return state

    const loading = state.fromText !== ''

    const newState = {
      ...state,
      sourceLanguage: action.payload,
      result: '',
      loading
    }

    updateLocalStorage(newState)

    return newState
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.targetLanguage === action.payload) return state

    const loading = state.fromText !== ''

    const newState = {
      ...state,
      targetLanguage: action.payload,
      result: '',
      loading
    }

    updateLocalStorage(newState)

    return newState
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''

    const newState = {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }

    updateLocalStorage(newState)

    return newState
  }

  if (type === 'SET_RESULT') {
    const newState = {
      ...state,
      loading: false,
      result: action.payload
    }

    updateLocalStorage(newState)

    return newState
  }

  return state
}
