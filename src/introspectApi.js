import fetch from 'node-fetch'
import { introspectionQuery } from 'graphql'

require('dotenv').config()

const { BEARER_TOKEN } = process.env

/**
 * Runs an introspection query and writes the result to `introspection.json`
 */
function introspect (apiUrl) {
  const headers = {
    'Content-Type': 'application/json'
  }

  if (BEARER_TOKEN) {
    headers.Authorization = `Bearer ${BEARER_TOKEN}`
  } else {
    console.log('No ID_TOKEN detected. To make authenticated introspection queries please provide an ID_TOKEN.')
  }

  return fetch(apiUrl, {
    headers,
    method: 'POST',
    body: JSON.stringify({ query: introspectionQuery }),
    timeout: 2000
  })
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        throw new Error(res.errors)
      } else {
        return res.data
      }
    })
}

export default introspect
