import React from 'react'
import { Router, useRouterHistory } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import { createHistory } from 'history'
import apolloClient from './store/apollo'
import configureStore from './store/configureStore'
import getRoutes from './scenes/routes'
import './styles/main.css'

console.log(window.APOLLO_STATE)

const store = configureStore(window.APOLLO_STATE)

const browserHistory = useRouterHistory(createHistory)({
  basename: '/',
})

const routes = getRoutes({ store })

export default () => {
  return (
    <ApolloProvider client={apolloClient} store={store}>
      <Router
        history={browserHistory}
        routes={routes}
      />
    </ApolloProvider>
  )
}
