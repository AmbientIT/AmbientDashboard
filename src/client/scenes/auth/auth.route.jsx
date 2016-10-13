import React from 'react'
import { Route } from 'react-router'
import { forbiddenIfLoggedIn } from '../guards'
import Auth from './Auth'

export const parent = 'main'

export default params => {
  return (
    <Route
      path="/login"
      component={Auth}
      key="login"
      onEnter={forbiddenIfLoggedIn(params.store)}
    />
  )
}
