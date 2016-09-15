import React from 'react'
import { IndexRoute } from 'react-router/es6'
import { loadRoute, errorLoading, requireRoutes } from 'containers/routes' //eslint-disable-line
import Home from './Home'
import { routeName as parentRoute } from '../dashboard.route'

export const parent = parentRoute
export const routeName = 'dashboard'

export default () => {
  return (
    <IndexRoute
      component={Home}
      key="dashboardHome"
    />
  )
}
