import { Stack } from 'react-bootstrap'
import { SectionType, type SourceLanguage } from '../types.d'
import { LanguageSelector } from './LanguageSelector'
import { TextArea } from './TextArea'

interface Props {
  sourceLanguage: SourceLanguage
  setSourceLanguage: (sourceLanguage: SourceLanguage) => void
  fromText: string
  setFromText: (text: string) => void
}

export function SourceLangSection ({ sourceLanguage, setSourceLanguage, fromText, setFromText }: Props) {
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
      </div>
    </Stack>
  )
}
