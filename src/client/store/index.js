import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
// import { createMiddleware } from 'redux-storage'
// import createEngine from 'redux-storage-engine-localforage'
import rootReducer from './reducer'
import createLogger from './middleware/logger'

export default function configureStore(initialState = {}, browserHistory) {
  const sagaMiddleware = createSagaMiddleware()

  const hasDevTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'

  const enhancers = [
    hasDevTools ? window.devToolsExtension() : null,
  ].filter(enhancer => !!enhancer)

  const storeFactory = compose(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(browserHistory),
      // createMiddleware(createEngine('local-state')),
      createLogger,
    ),
    ...enhancers
  )(createStore)

  const store = storeFactory(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
