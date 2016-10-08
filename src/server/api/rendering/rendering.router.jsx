import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'
import { RouterContext } from 'react-router'
import { renderToStringWithData } from 'react-apollo/server'
import { renderToStaticMarkup } from 'react-dom/server'
import getRoutes from '../.././../client/scenes/routes'
import { _match, getApolloClient } from './lib'
import configureStore from '../../../client/store/configureStore'
import Html from './App'

export default (router) => {
  router.get('/*', async (ctx, next) => {
    const store = configureStore()
    const routes = getRoutes({ ctx, store })
    const { renderProps, redirectLocation } = await _match({ routes, location: ctx.url })

    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const { request: { headers } } = ctx
      const { markup, initialState } = await renderToStringWithData(
        <AppContainer>
          <ApolloProvider client={getApolloClient({ headers })} >
            <RouterContext {...renderProps} />
          </ApolloProvider>
        </AppContainer>
      )

      const html = <Html markup={markup} apolloState={initialState} initialState={store.getState()} />
      ctx.body = `<!doctype html>\n${renderToStaticMarkup(html)}`
    } else {
      await next()
    }
  })
}
