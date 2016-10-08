import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'
import { RouterContext } from 'react-router'
import { renderToStringWithData } from 'react-apollo/server'
import getRoutes from '../.././../client/scenes/routes'
import { _match, getApolloClient } from './lib'
import configureStore from '../../../client/store/configureStore'

export default (router) => {
  router.get('/*', async (ctx, next) => {
    const store = configureStore()
    const routes = getRoutes({ ctx, store })

    const { renderProps, redirectLocation } = await _match({ routes, location: ctx.url })

    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const { request: { headers } } = ctx

      await ctx.render('index', await renderToStringWithData(
        <AppContainer>
          <ApolloProvider client={getApolloClient({ headers, store })} store={store} >
            <RouterContext {...renderProps} />
          </ApolloProvider>
        </AppContainer>
      ))
    } else {
      await next()
    }
  })
}
