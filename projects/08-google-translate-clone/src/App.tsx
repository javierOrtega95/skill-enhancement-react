import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { ArrowsIcon } from './components/Icons'
import { useTranslator } from './hooks/useTranslator'
import { AUTO_LANGUAGE } from './constants'

function App () {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useTranslator()

  return (
    <main className='App'>
      <h2>Google Translate Clone</h2>
      <Container fluid>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
              />

              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
            </Stack>

          </Col>

          <Col xs='auto'>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
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
