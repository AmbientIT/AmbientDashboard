import React from 'react'
import { Route, IndexRoute } from 'react-router/es6'

import { loadRoute, errorLoading } from 'containers/routes' //eslint-disable-line

const requireDashboardRoutes = requireContext => requireContext.keys().map(requireContext)

const dashboardRoutes = requireDashboardRoutes(require.context('./', true, /^\.\/.*\.route.jsx$/))
  .filter(route => !!route.default)
  .map(route => route.default)
  .filter(route => route.props.parent === 'dashboard')

export default (
  <Route
    getComponent={(location, cb) => {
      System.import('./Dashboard').then(loadRoute(cb)).catch(errorLoading)
    }}
    key="dashboard"
    parent="main"
  >
    <IndexRoute
      getComponent={(location, cb) => {
        System.import('./home/Home').then(loadRoute(cb)).catch(errorLoading)
      }}
    />
    {dashboardRoutes.map(route => route)}
  </Route>
)
