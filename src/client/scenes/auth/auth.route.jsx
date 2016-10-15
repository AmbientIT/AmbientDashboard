import React from 'react'
import { Route } from 'react-router'
import { forbiddenIfLoggedIn } from '../guards'
import Login from './Login'

export const parent = 'main'

export default params => {
  return (
    <Route
      path="/login"
      component={Login}
      key="login"
      onEnter={forbiddenIfLoggedIn(params.store)}
    />
  )
}
