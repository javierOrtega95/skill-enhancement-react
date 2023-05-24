const express = require('express')
const cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000
const API_URL = process.env.DEEPL_API_URL
const API_KEY = process.env.DEEPL_API_KEY

app.post('/api/translate/', async (req, res) => {
  const { sourceLanguage, targetLanguage, text } = req.body

  const commonData = { target_lang: targetLanguage, text }

  const data = sourceLanguage === 'auto' ? commonData : { ...commonData, source_lang: sourceLanguage }

  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `DeepL-Auth-Key ${API_KEY}`
    },
    body: new URLSearchParams(data)
  })

  if (!response.ok) {
    return res.status(200).send('Error translating')
  }

  const result = await response.json()

  res.status(200).send(result)
})

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
})
