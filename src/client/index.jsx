import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import { createHistory } from 'history'
import { Router, useRouterHistory } from 'react-router'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import apolloClient from './store/apollo'
import configureStore from './store/configureStore'
import getRoutes from './scenes/routes'
import App from './App'

const browserHistory = useRouterHistory(createHistory)({
  basename: '/',
})

const store = configureStore(window.INITIAL_STATE)

const routes = getRoutes({ store })

const rootEl = document.getElementById('react-container')

render(
  <AppContainer>
    <App
      radiumConfig={{ userAgent: navigator.userAgent }}
      apolloClient={apolloClient}
      store={store}
      muiTheme={getMuiTheme(lightBaseTheme)}
      locale={navigator.language}
    >
      <Router
        history={browserHistory}
        routes={routes}
      />
    </App>
  </AppContainer>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      , rootEl
    )
  })
}
