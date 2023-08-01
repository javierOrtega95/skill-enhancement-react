import { useContext } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { SectionType, type Language } from '../types.d'
import { ClipBoardIcon, VolumeIcon } from './Icons'
import { LanguageSelector } from './LanguageSelector'
import { ToastContext } from './toast/context/ToastProvider'
import { TextArea } from './TextArea'
import Tooltip from './tooltip/Tooltip'
import { useSpeech } from '../hooks/useSpeech'

interface Props {
  targetLanguage: Language
  setTargetLanguage: (targetLanguage: Language) => void
  result: string
  setResult: (text: string) => void
  loading: boolean
}

export function TargetLangSection ({
  targetLanguage,
  setTargetLanguage,
  result,
  setResult,
  loading
}: Props) {
  const { open } = useContext(ToastContext)
  const { handleSpeak } = useSpeech({ text: result, lang: targetLanguage })

  const handleClipboard = () => {
    navigator.clipboard
      .writeText(result)
      .then(() => {
        open('Translation copied')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Stack gap={2}>
      <LanguageSelector
        type={SectionType.To}
        value={targetLanguage}
        onChange={setTargetLanguage}
      />

      <div className='textarea-wrapper disabled'>
        <TextArea
          loading={loading}
          type={SectionType.To}
          value={result}
          onChange={setResult}
        />

        <div className='actions'>
          <Tooltip text='Listen'>
            <Button
              variant='link'
              disabled={result === ''}
              onClick={handleSpeak}
            >
              <VolumeIcon />
            </Button>
          </Tooltip>
          <Tooltip text='Copy to clipboard'>
            <Button
              variant='link'
              onClick={handleClipboard}
              disabled={result === ''}
            >
              <ClipBoardIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Stack>
  )
}
