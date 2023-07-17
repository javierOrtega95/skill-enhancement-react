import { Button, Stack } from 'react-bootstrap'
import { SectionType, type SourceLanguage } from '../types.d'
import { LanguageSelector } from './LanguageSelector'
import { VolumeIcon } from './Icons'
import { TextArea } from './TextArea'
import Tooltip from './tooltip/Tooltip'
import { useSpeech } from '../hooks/useSpeech'

interface Props {
  sourceLanguage: SourceLanguage
  setSourceLanguage: (sourceLanguage: SourceLanguage) => void
  fromText: string
  setFromText: (text: string) => void
}

export function SourceLangSection ({ sourceLanguage, setSourceLanguage, fromText, setFromText }: Props) {
  const { handleSpeak } = useSpeech({ text: fromText, lang: sourceLanguage })
  return (
    <Stack gap={2}>
      <LanguageSelector
        type={SectionType.From}
        value={sourceLanguage}
        onChange={setSourceLanguage}
      />

      <div className='textarea-wrapper'>
        <TextArea
          type={SectionType.From}
          value={fromText}
          onChange={setFromText}
        />
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
      </div>
    </Stack>
  )
}
