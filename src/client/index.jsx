/* eslint import/no-unresolved:0 */
/* eslint import/no-named-as-default-member:0 */
import React from 'react'
import Relay from 'react-relay'
import ReactDOM from 'react-dom'
import { Router, useRouterHistory, applyRouterMiddleware } from 'react-router'
import { createHistory } from 'history'
import useRelay from 'react-router-relay'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import routes from './routes'
import './styles/main.css'

const { HOST, PORT } = process.env.GRAPHQL


const browserHistory = useRouterHistory(createHistory)({
  basename: '/',
})

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(`http://${HOST}:${PORT}/graphql`)
)

injectTapEventPlugin()

const rootElement = document.getElementById('react-container')

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Router
      history={browserHistory}
      routes={routes}
      environment={Relay.Store}
      render={applyRouterMiddleware(useRelay.default)}
    />
  </MuiThemeProvider>,
  rootElement
)
