import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { ArrowsIcon } from './components/Icons'
import { useTranslate } from './hooks/useTranslate'
import { AUTO_LANGUAGE } from './constants'

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

  return (
    <main className='App'>
      <h2>Google Translate Clone</h2>
      <Container fluid>
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
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default App
