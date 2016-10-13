import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'

injectTapEventPlugin()

const rootEl = window.document.getElementById('react-container')

render(
  <AppContainer>
    <App radiumConfig={{ userAgent: navigator.userAgent }} />
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
