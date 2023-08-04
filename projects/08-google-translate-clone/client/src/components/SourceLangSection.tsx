import { Button, Stack } from 'react-bootstrap'
import { SectionType, type SourceLanguage } from '../types.d'
import { LanguageSelector } from './LanguageSelector'
import { CloseIcon, VolumeIcon } from './Icons'
import Tooltip from './tooltip/Tooltip'
import { useSpeech } from '../hooks/useSpeech'
import TextArea from './TextArea'
import { useRef } from 'react'

interface Props {
  sourceLanguage: SourceLanguage
  setSourceLanguage: (sourceLanguage: SourceLanguage) => void
  fromText: string
  setFromText: (text: string) => void
}

export function SourceLangSection ({
  sourceLanguage,
  setSourceLanguage,
  fromText,
  setFromText
}: Props) {
  const { handleSpeak } = useSpeech({ text: fromText, lang: sourceLanguage })

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleWrapperClick = () => {
    textAreaRef.current?.focus()
  }

  const handleRemoveTextClick = () => {
    setFromText('')
  }

  const showActions = Boolean(fromText)

  return (
    <Stack gap={2}>
      <LanguageSelector
        type={SectionType.From}
        value={sourceLanguage}
        onChange={setSourceLanguage}
      />

      <div className='textarea-wrapper' onClick={handleWrapperClick}>
        <div className='input-wrapper'>
          <TextArea
            ref={textAreaRef}
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
          />
        </div>

        {showActions && (
          <div className='remove-btn'>
            <Tooltip text='Clear source text'>
              <Button variant='link' onClick={handleRemoveTextClick}>
                <CloseIcon />
              </Button>
            </Tooltip>
          </div>
        )}

        {showActions && (
          <div className='actions'>
            <Tooltip text='Listen'>
              <Button
                variant='link'
                disabled={fromText === '' || sourceLanguage === 'auto'}
                onClick={handleSpeak}
              >
                <VolumeIcon />
              </Button>
            </Tooltip>
          </div>
        )}
      </div>
    </Stack>
  )
}
