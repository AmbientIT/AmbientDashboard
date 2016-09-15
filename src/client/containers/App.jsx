import React from 'react'
import { Router, useRouterHistory } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import { createHistory } from 'history'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import apolloClient from 'store/apollo' // eslint-disable-line
import configureStore from 'store/configureStore' //eslint-disable-line
import routes from './routes'
import 'styles/main.css' // eslint-disable-line

const store = configureStore()

const browserHistory = useRouterHistory(createHistory)({
  basename: '/',
})

export default () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <ApolloProvider client={apolloClient} store={store}>
        <Router
          history={browserHistory}
          routes={routes}
        />
      </ApolloProvider>
    </MuiThemeProvider>
  )
}
