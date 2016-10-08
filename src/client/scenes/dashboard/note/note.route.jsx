import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { loadRoute, errorLoading } from '../../routes'

export default () => {
  return (
    <Route
      path="/note"
      // component={Note}
      getComponent={(location, cb) => {
        System.import('./Note').then(loadRoute(cb)).catch(errorLoading)
      }}
    >
      <IndexRoute
        // component={NoteList}
        getComponent={(location, cb) => {
          System.import('./list/NoteList').then(loadRoute(cb)).catch(errorLoading)
        }}
      />
      <Route
        path="/edit/:id"
        getComponent={(location, cb) => {
          System.import('./edit/NoteEdit').then(loadRoute(cb)).catch(errorLoading)
        }}
      />
      <Route
        path="/create"
        getComponent={(location, cb) => {
          System.import('./create/NoteCreate').then(loadRoute(cb)).catch(errorLoading)
        }}
      />
    </Route>
  )
}
