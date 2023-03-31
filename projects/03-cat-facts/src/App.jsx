import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

function App () {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState(null)

  // fetch fact cat
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // fetch cat image url from fact
  useEffect(() => {
    if (!fact) return

    fetch(`${CAT_ENDPOINT_IMAGE_URL}/${fact.split(' ', 1)}?json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  return (
    <main>
      <h1>Random cat facts</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={`${CAT_PREFIX_IMAGE_URL}/${imageUrl}`}
            alt='Image extracted using the first word of the fact'
          />
        )}
      </section>
    </main>
  )
}

export default App
