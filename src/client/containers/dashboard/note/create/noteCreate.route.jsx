import React from 'react'
import { Route } from 'react-router/es6'
import { loadRoute, errorLoading } from 'containers/routes' //eslint-disable-line
import { routeName as parentRoute } from '../note.route'

export const parent = parentRoute

export default () => {
  return (
    <Route
      path="create"
      getComponent={(location, cb) => {
        System.import('./NoteCreate').then(loadRoute(cb)).catch(errorLoading)
      }}
      key="noteCreate"
    />
  )
}
