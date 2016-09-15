import React from 'react'
import { Route } from 'react-router/es6'
import { loadRoute, errorLoading, routeName as parentRoute, requireRoutes } from 'containers/routes' //eslint-disable-line
import { requireAuth } from 'containers/guards' //eslint-disable-line

export const parent = parentRoute
export const routeName = 'dashboard'

export default store => {
  const dashboardRoutes = requireRoutes(routeName, store)
  return (
    <Route
      getComponent={(location, cb) => {
        System.import('./Dashboard').then(loadRoute(cb)).catch(errorLoading)
      }}
      key="dashboard"
      onEnter={requireAuth(store)}
    >
      {dashboardRoutes.map(route => route)}
    </Route>
  )
}
