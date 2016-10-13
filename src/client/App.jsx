import React from 'react'
import { Router, useRouterHistory } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import { createHistory } from 'history'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { StyleRoot } from 'radium'
import apolloClient from './store/apollo'
import configureStore from './store/configureStore'
import getRoutes from './scenes/routes'

const store = configureStore(window.INITIAL_STATE)

const browserHistory = useRouterHistory(createHistory)({
  basename: '/',
})

const routes = getRoutes({ store })

export default () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <StyleRoot>
        <ApolloProvider client={apolloClient} store={store}>
          <Router
            history={browserHistory}
            routes={routes}
          />
        </ApolloProvider>
      </StyleRoot>
    </MuiThemeProvider>
  )
}
