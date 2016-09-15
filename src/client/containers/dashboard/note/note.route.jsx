import React from 'react'
import { Route } from 'react-router/es6'
import { loadRoute, errorLoading, requireRoutes } from 'containers/routes' //eslint-disable-line
import { routeName as parentRoute } from '../dashboard.route'

export const parent = parentRoute
export const routeName = 'note'

export default store => {
  const noteRoutes = requireRoutes(routeName, store)
  return (
    <Route
      path="/note"
      getComponent={(location, cb) => {
        System.import('./Note').then(loadRoute(cb)).catch(errorLoading)
      }}
      key="note"
      parent="dashboard"
    >
      {noteRoutes.map(route => route)}
    </Route>
  )
}
