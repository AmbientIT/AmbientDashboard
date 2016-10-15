import React, { Component, PropTypes } from 'react'
import { ApolloProvider } from 'react-apollo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { StyleRoot } from 'radium'

export default class App extends Component {
  getChildContext() {
    return {
      locale: this.props.locale,
    }
  }
  render() {
    const { children, muiTheme, apolloClient, store } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <StyleRoot>
          <ApolloProvider client={apolloClient} store={store}>
            {children}
          </ApolloProvider>
        </StyleRoot>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
  muiTheme: PropTypes.object,
  apolloClient: PropTypes.object,
  store: PropTypes.object,
  locale: PropTypes.string,
}

App.defaultProps = {
  store: {},
}

App.childContextTypes = {
  locale: PropTypes.string.isRequired,
}
