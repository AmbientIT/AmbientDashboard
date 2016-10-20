import React, { Component, PropTypes } from 'react'
import { ApolloProvider } from 'react-apollo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import radium, { StyleRoot, Style } from 'radium'
import { IntlProvider } from 'react-intl'
import { reset } from './styles'

@radium()
export default class App extends Component {
  getChildContext() {
    return {
      _radiumConfig: this.props.radiumConfig,
    }
  }
  render() {
    const { children, muiTheme, apolloClient, store, locale } = this.props
    return (
      <IntlProvider locale={locale}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <StyleRoot>
            <Style rules={reset} />
            <ApolloProvider client={apolloClient} store={store}>
              {children}
            </ApolloProvider>
          </StyleRoot>
        </MuiThemeProvider>
      </IntlProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
  muiTheme: PropTypes.shape(),
  apolloClient: PropTypes.shape(),
  store: PropTypes.shape(),
  locale: PropTypes.string,
  radiumConfig: PropTypes.shape(),
}

App.childContextTypes = {
  locale: PropTypes.string.isRequired,
  _radiumConfig: PropTypes.object.isRequired,
}
