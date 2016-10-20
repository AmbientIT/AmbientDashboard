import { match } from 'react-router'
import { Locales } from 'locale'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { env } from '../../../_core'

export const _match = params => {
  return new Promise((resolve, reject) => {
    match(params, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error)
      } else {
        resolve({ redirectLocation, renderProps })
      }
    })
  })
}

export const getApolloClient = ({ headers }) => {
  return new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface(`http://localhost:${env.PORT}/graphql`, {
      headers,
    }),
  })
}


export const getLocale = headers => {
  return new Locales(headers['accept-language'])
    .best(new Locales(env.languages)).code
}
