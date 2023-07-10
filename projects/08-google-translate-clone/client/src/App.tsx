import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './App.css'
import { ArrowsIcon } from './components/Icons'
import { SourceLangSection } from './components/SourceLangSection'
import { TargetLangSection } from './components/TargetLangSection'
import { AUTO_LANGUAGE } from './constants'
import { useTranslate } from './hooks/useTranslate'

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
      <Container fluid>
        <h2>Google Translate Clone</h2>
        <Row>
          <Col>
            <SourceLangSection
              sourceLanguage={sourceLanguage}
              setSourceLanguage={setSourceLanguage}
              fromText={fromText}
              setFromText={setFromText}
            />
          </Col>

          <Col xs='auto'>
            <Button variant='link' disabled={sourceLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Col>
            <TargetLangSection
              targetLanguage={targetLanguage}
              setTargetLanguage={setTargetLanguage}
              result={result}
              setResult={setResult}
              loading={loading}
            />
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default App
