import { useTimeout } from '../../hooks/useTimeout'
import './toast.css'

interface Props {
  close: () => void
  delay?: number
  children?: React.ReactNode
}

export const Toast: React.FC<Props> = (props) => {
  useTimeout(props.close, 5000)

  return (
    <div className='toast'>
      <div className='toast-text'>{props.children}</div>
    </div>
  )
}
