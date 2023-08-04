import { expect, test } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import App from './App'

test('My App works as expected', async () => {
  const app = render(<App />)

  const sourceTextArea = app.getByPlaceholderText('Enter text')

  fireEvent.change(sourceTextArea, { target: { value: 'Hola mundo' } })

  const targetTextArea = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 2000 })

  expect(targetTextArea).toBeTruthy()
})
