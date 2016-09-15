import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './containers/App'

const rootEl = window.document.getElementById('react-container')
injectTapEventPlugin()

render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      , rootEl
    )
  })
}
