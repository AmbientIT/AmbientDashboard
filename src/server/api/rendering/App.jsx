import React, { PropTypes } from 'react'
// import { AppContainer } from 'react-hot-loader'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ApolloProvider } from 'react-apollo'
import { RouterContext } from 'react-router'
import { StyleRoot } from 'radium'
import { getApolloClient } from './lib'

const App = ({ ctx, renderProps }) => {
  const { request: { headers } } = ctx
  const userAgent = headers['user-agent']
  const muiTheme = getMuiTheme(Object.assign({ userAgent }, lightBaseTheme))
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <StyleRoot>
        <ApolloProvider client={getApolloClient({ headers })} >
          <RouterContext {...renderProps} />
        </ApolloProvider>
      </StyleRoot>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  ctx: PropTypes.shape({
    request: PropTypes.shape({
      headers: PropTypes.object,
    }),
  }),
  renderProps: PropTypes.object,
}

export default App
