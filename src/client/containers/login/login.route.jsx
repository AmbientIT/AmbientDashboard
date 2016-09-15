import React from 'react'
import { Route } from 'react-router/es6'
import { loadRoute, errorLoading } from 'containers/routes' // eslint-disable-line
import { forbiddenIfLoggedIn } from 'containers/guards' //eslint-disable-line
import Login from './Login'

export const parent = 'main'

export default store => {
  return (
    <Route
      path="/login"
      component={Login}
      key="login"
      onEnter={forbiddenIfLoggedIn(store)}
    />
  )
}
