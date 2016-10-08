import React from 'react'
import { Route } from 'react-router'
// import { loadRoute, errorLoading } from '../routes'
import { requireAuth } from '../guards'
// import Home from './home/Home'
import Dashboard from './Dashboard'
import getNoteRoute from './note/note.route'

export default (store, ctx) => {
  return (
    <Route
      path="/"
      component={Dashboard}
      // getComponent={(location, cb) => {
      //   System.import('./Dashboard').then(loadRoute(cb)).catch(errorLoading)
      // }}
      onEnter={requireAuth(store, ctx)}
    >
      {/* <IndexRoute
        component={Home}
      /> */}
      {getNoteRoute(store, ctx)}
    </Route>
  )
}
