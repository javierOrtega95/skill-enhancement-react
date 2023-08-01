import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import { forwardRef, useRef, type ForwardedRef, type RefObject } from 'react'
import { useAutosizeTextArea } from '../hooks/useAutosizeTextArea'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Enter text'
  if (loading === true) return 'Loading...'
  return 'Translation'
}

const TextArea = ({ type, loading, value, onChange }: Props, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const textareaRef = ref as RefObject<HTMLTextAreaElement> ?? useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textareaRef.current, value)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      ref={ref ?? textareaRef}
      autoFocus={type === SectionType.From}
      as='textarea'
      disabled={type === SectionType.To}
      placeholder={getPlaceholder({ type, loading })}
      value={value}
      onChange={handleChange}
    />
  )
}

export default forwardRef(TextArea)
