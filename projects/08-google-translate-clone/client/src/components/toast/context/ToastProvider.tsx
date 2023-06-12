import { createContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { Toast } from '../Toast'
import { type IToast, type ToastContextType } from './types'
import { v4 } from 'uuid'

const defaultState: ToastContextType = {
  toasts: [],
  open: () => {},
  close: () => {}
}

export const ToastContext = createContext(defaultState)

interface Props {
  children?: React.ReactNode
}

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([])

  const open = (content: string) => {
    setToasts((state) => {
      return [...state, { id: v4(), content }]
    })
  }

  const close = (id: string) => {
    setToasts((state: IToast[]) => {
      return state.filter((toast) => toast.id !== id)
    })
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        open,
        close
      }}
    >
      {children}
      {createPortal(
        <div className='toasts-wrapper'>
          {toasts.map((toast: IToast) => (
            <Toast
              key={toast.id}
              close={() => {
                close(toast.id)
              }}
            >
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}
