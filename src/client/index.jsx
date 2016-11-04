import React from 'react'
import { render } from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { createHistory } from 'history'
import { Router, useRouterHistory } from 'react-router'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import es from 'react-intl/locale-data/es'
import configureStore from './store'
import getRoutes from './scenes/routes'
import App from './App'
import noteSaga from './store/saga/note'
import loggerSaga from './store/saga/logger'
import authSaga from './store/saga/auth'

export { configureStore, getRoutes, App }

addLocaleData([...en, ...fr, ...es])

const browserHistory = useRouterHistory(createHistory)({
  basename: '/',
})

const store = configureStore(window.INITIAL_STATE, browserHistory)

store.runSaga(loggerSaga)
store.runSaga(noteSaga)
store.runSaga(authSaga)

const routes = getRoutes({ store })

const history = syncHistoryWithStore(browserHistory, store)

const rootEl = document.getElementById('react-container')

render(
  <App
    radiumConfig={{ userAgent: 'all' }}
    store={store}
    muiTheme={getMuiTheme(lightBaseTheme)}
    locale={navigator.language}
  >
    <Router
      history={history}
      routes={routes}
    />
  </App>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default

    render(
      <NextApp>
        <Router
          history={browserHistory}
          routes={routes}
        />
      </NextApp>
      , rootEl
    )
  })
}

const asyncCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('tototo')
    }, 5555)
  })
}


const co = require('co')

co(function* myGen() {
  const toto = yield asyncCall()
  console.log(toto)
})

function* autreGenerateur(i) {
  yield i + 1
  yield i + 2
  yield i + 3
}
function* generateur(i) {
  yield i
  yield* autreGenerateur(i)
  yield i + 10
}

const gen = generateur(10)

console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
