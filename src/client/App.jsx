import React, { Component, PropTypes } from 'react'
import { ApolloProvider } from 'react-apollo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import radium, { StyleRoot, Style } from 'radium'
import { reset } from './styles'

@radium()
export default class App extends Component {
  getChildContext() {
    return {
      locale: this.props.locale,
      _radiumConfig: this.props.radiumConfig,
    }
  }
  render() {
    const { children, muiTheme, apolloClient, store } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <StyleRoot>
          <Style rules={reset} />
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
  radiumConfig: PropTypes.object,
}

App.childContextTypes = {
  locale: PropTypes.string.isRequired,
  _radiumConfig: PropTypes.object.isRequired,
}
