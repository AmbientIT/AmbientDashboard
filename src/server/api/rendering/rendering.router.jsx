import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { renderToStringWithData } from 'react-apollo/server'
import { renderToStaticMarkup } from 'react-dom/server'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { RouterContext } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { _match, getLocale, getApolloClient } from './lib'
import getRoutes from '../.././../client/scenes/routes'
import configureStore from '../../../client/store'
import App from '../../../client/App'
import Html from '../../views/Html'

injectTapEventPlugin()

export default (router) => {
  router.get('/*', async (ctx, next) => {
    const store = configureStore()
    const routes = getRoutes({ ctx, store })
    const { renderProps, redirectLocation } = await _match({ routes, location: ctx.url })
    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const locale = getLocale(ctx.request.headers)
      const { request: { headers } } = ctx
      const userAgent = headers['user-agent']
      const { markup, initialState } = await renderToStringWithData(
        <AppContainer>
          <App
            radiumConfig={{ userAgent }}
            apolloClient={getApolloClient({ headers })}
            muiTheme={getMuiTheme(Object.assign({ userAgent }, lightBaseTheme))}
            locale={locale}
            store={ctx.url !== '/login' ? store : null}
          >
            <RouterContext {...renderProps} />
          </App>
        </AppContainer>
      )

      ctx.body = `<!doctype html>\n${renderToStaticMarkup(
        <Html
          locale={locale}
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
