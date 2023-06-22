import { useEffect } from 'react'

export function useAutosizeTextArea (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) {
  useEffect(() => {
    if (textAreaRef !== null) {
      textAreaRef.style.height = '0px'
      const scrollHeight = textAreaRef.scrollHeight

      textAreaRef.style.height = `${scrollHeight}px`
    }
  }, [textAreaRef, value])
}
