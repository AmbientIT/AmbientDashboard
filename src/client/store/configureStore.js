import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import apolloClient from './apollo'
import rootReducer from './reducer'

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  createLogger(),
  apolloClient.middleware(),
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : undefined
  )

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer')

      store.replaceReducer(nextReducer)
    })
  }

  return store
}
