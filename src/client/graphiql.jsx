import React from 'react'
import { render } from 'react-dom'
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'

const graphQLFetcher = (graphQLParams) => {
  return fetch(`${window.location.origin}/api/graphql`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}

render(<GraphiQL fetcher={graphQLFetcher} />, document.body)
