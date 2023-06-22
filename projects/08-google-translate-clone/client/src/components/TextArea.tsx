import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import { useRef } from 'react'
import { useAutosizeTextArea } from '../hooks/useAutoSizeTextArea'

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

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textareaRef.current, value)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      ref={textareaRef}
      autoFocus={type === SectionType.From}
      as='textarea'
      disabled={type === SectionType.To}
      placeholder={getPlaceholder({ type, loading })}
      value={value}
      onChange={handleChange}
    />
  )
}
