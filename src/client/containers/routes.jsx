import React from 'react'
import { Route } from 'react-router/es6'

const requireAllRoutes = requireContext => requireContext.keys().map(requireContext)

const appRoutes = requireAllRoutes(require.context('./', true, /^\.\/.*\.route.jsx$/))
  .map(route => route.default)
  .filter(route => route.props.parent === 'main')

export const errorLoading = err => {
  console.error('Dynamic page loading failed', err)
}

export const loadRoute = cb => module => cb(null, module.default)

export default (
  <Route path="/">
    {appRoutes.map(route => route)}
  </Route>
)
