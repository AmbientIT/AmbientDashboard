import React from 'react'
import { Route } from 'react-router/es6'
import { loadRoute, errorLoading } from 'containers/routes' // eslint-disable-line

export default (
  <Route
    path="/login"
    getComponent={(location, cb) => {
      System.import('./Login').then(loadRoute(cb)).catch(errorLoading)
    }}
    key="login"
    parent="main"
  />
)
