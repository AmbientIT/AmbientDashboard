import { match } from 'react-router'
import { Locales } from 'locale'
import fs from 'fs'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { env } from '../../../_core'

export * from './Html'

export const _match = (params) => {
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

export const getGlobalCss = () => {
  return fs.readFileSync(`${process.cwd()}/node_modules/normalize.css/normalize.css`, { encoding: 'utf8' })
}

export const getLocale = headers => {
  const locales = new Locales(headers['accept-language'])
  return locales.best(new Locales(env.languages)).code
}
