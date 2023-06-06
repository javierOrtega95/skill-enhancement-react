export interface IToast {
  id: string
  content: string
}

export interface ToastContextType {
  toasts: IToast[]
  open: (content: string) => void
  close: (id: string) => void
}
