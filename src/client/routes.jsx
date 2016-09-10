import React from 'react'
import { Route } from 'react-router'

import loginRoute from './containers/login/login.route'
import dashboardRoute from './containers/dashboard/dashboard.route'

export default (
  <Route path="/">
    {loginRoute}
    {dashboardRoute}
  </Route>
)
