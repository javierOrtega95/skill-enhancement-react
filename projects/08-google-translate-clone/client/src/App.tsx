import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { ArrowsIcon, ClipBoardIcon } from './components/Icons'
import { useTranslate } from './hooks/useTranslate'
import { AUTO_LANGUAGE } from './constants'
import { Tooltip } from './components/tooltip/Tooltip'

function App () {
  const {
    loading,
    sourceLanguage,
    targetLanguage,
    fromText,
    result,
    interchangeLanguages,
    setSourceLanguage,
    setTargetLanguage,
    setFromText,
    setResult
  } = useTranslate()

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch((error) => {
      console.error(error)
    })
  }

  return (
    <main className='App'>
      <Container fluid>
        <h2>Google Translate Clone</h2>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={sourceLanguage}
                onChange={setSourceLanguage}
              />

              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
            </Stack>

          </Col>

          <Col xs='auto'>
            <Button variant='link' disabled={sourceLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={targetLanguage}
                onChange={setTargetLanguage}
              />
              <div className='translation-wrapper'>
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
                    >
                      <ClipBoardIcon />
                    </Button>
                  </Tooltip>
                </div>

              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default App
