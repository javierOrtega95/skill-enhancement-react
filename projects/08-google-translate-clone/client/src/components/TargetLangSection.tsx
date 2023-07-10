import { Button, Stack } from 'react-bootstrap'
import { LanguageSelector } from './LanguageSelector'
import { TextArea } from './TextArea'
import { Tooltip } from './tooltip/Tooltip'
import { ClipBoardIcon } from './Icons'
import { useContext } from 'react'
import { ToastContext } from './toast/context/ToastProvider'
import { SectionType, type Language } from '../types.d'

interface Props {
  targetLanguage: Language
  setTargetLanguage: (targetLanguage: Language) => void
  result: string
  setResult: (text: string) => void
  loading: boolean
}

export function TargetLangSection ({ targetLanguage, setTargetLanguage, result, setResult, loading }: Props) {
  const { open } = useContext(ToastContext)

  const handleClipboard = () => {
    navigator.clipboard.writeText(result)
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
