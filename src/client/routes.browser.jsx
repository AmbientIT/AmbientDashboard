import React from 'react'
import { Route } from 'react-router'

import loginRoute from './components/login/login.route.browser'
import dashboardRoute from './components/dashboard/dashboard.route.browser'

export default (
  <Route path="/">
    {loginRoute}
    {dashboardRoute}
  </Route>
)
