import React from 'react'
import { Route } from 'react-router/es6'

const requireRoutesHelper = requireContext => requireContext.keys().map(requireContext)

export const requireRoutes = (routeName, store) => {
  return requireRoutesHelper(require.context('./', true, /^\.\/.*\.route.jsx$/))
    .filter(route => route.parent === routeName)
    .map(route => route.default(store))
}

export const errorLoading = err => {
  console.error('Dynamic page loading failed', err)
}

export const loadRoute = cb => module => cb(null, module.default)

export const routeName = 'main'

export default store => {
  const appRoutes = requireRoutes(routeName, store)
  return (
    <Route path="/">
      {appRoutes.map(route => route)}
    </Route>
  )
}
