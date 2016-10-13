import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'
import { RouterContext } from 'react-router'
import { renderToStringWithData } from 'react-apollo/server'
import { renderToStaticMarkup } from 'react-dom/server'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { StyleRoot } from 'radium'
import getRoutes from '../.././../client/scenes/routes'
import { _match, getApolloClient } from './lib'
import configureStore from '../../../client/store/configureStore'
import Html from './Html'
// import App from './App'

export default (router) => {
  router.get('/*', async (ctx, next) => {
    const store = configureStore()
    const routes = getRoutes({ ctx, store })
    const { renderProps, redirectLocation } = await _match({ routes, location: ctx.url })

    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const { request: { headers } } = ctx
      const userAgent = headers['user-agent']
      const muiTheme = getMuiTheme(Object.assign({ userAgent }, lightBaseTheme))
      const { markup, initialState } = await renderToStringWithData(
        <AppContainer>
          <MuiThemeProvider muiTheme={muiTheme} radiumConfig={{ userAgent }}>
            <StyleRoot>
              <ApolloProvider client={getApolloClient({ headers })} >
                <RouterContext {...renderProps} />
              </ApolloProvider>
            </StyleRoot>
          </MuiThemeProvider>
        </AppContainer>
      )
      // const { markup, initialState } = await renderToStringWithData(
      //   <AppContainer>
      //     <App ctx={ctx} renderProps={renderProps} radiumConfig={{ userAgent }} />
      //   </AppContainer>
      // )

      ctx.body = `<!doctype html>\n${renderToStaticMarkup(
        <Html
          markup={markup}
          apolloState={initialState}
          initialState={store.getState()}
        />
      )}`
    } else {
      await next()
    }
  })
}
