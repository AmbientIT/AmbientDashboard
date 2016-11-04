import React, { Component, PropTypes } from 'react'
// import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import radium, { StyleRoot, Style } from 'radium'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { IntlProvider } from 'react-intl'
import { reset } from './styles'

injectTapEventPlugin()

@radium()
export default class App extends Component {
  getChildContext() {
    return {
      _radiumConfig: this.props.radiumConfig,
    }
  }
  render() {
    const { children, muiTheme, store, locale } = this.props
    return (
      <IntlProvider locale={locale}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <StyleRoot>
            <Style rules={reset} />
            <Provider store={store}>
              {children}
            </Provider>
            {/* <ApolloProvider client={apolloClient} store={store}>
              {children}
            </ApolloProvider> */}
          </StyleRoot>
        </MuiThemeProvider>
      </IntlProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
  muiTheme: PropTypes.shape(),
  // apolloClient: PropTypes.shape(),
  store: PropTypes.shape(),
  locale: PropTypes.string,
  radiumConfig: PropTypes.shape(),
}

App.childContextTypes = {
  _radiumConfig: PropTypes.object.isRequired,
}
