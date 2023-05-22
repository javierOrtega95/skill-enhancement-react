const express = require('express')
const cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

app.use(cors())

const PORT = process.env.PORT || 3000
const API_URL = process.env.DEEPL_API_URL
const API_KEY = process.env.DEEPL_API_KEY

app.post('/api/translate/', async (req, res) => {
  const text = req.query.text
  const targetLanguage = req.query.target_lang

  const response = await fetch(`${API_URL}?text=${text}&target_lang=${targetLanguage}`, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${API_KEY}`
    }
  })

  if (!response.ok) {
    return 'Error'
  }

  const result = await response.json()
  console.log(result)
  res.status(200).send(result)
})

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
})
