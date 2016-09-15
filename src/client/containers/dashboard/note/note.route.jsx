import React from 'react'
import { IndexRoute, Route } from 'react-router/es6'
import { loadRoute, errorLoading } from 'containers/routes' //eslint-disable-line

export default (
  <Route
    path="/note"
    getComponent={(location, cb) => {
      System.import('./Note').then(loadRoute(cb)).catch(errorLoading)
    }}
    key="note"
    parent="dashboard"
  >
    <IndexRoute
      getComponent={(location, cb) => {
        System.import('./list/NoteList').then(loadRoute(cb)).catch(errorLoading)
      }}
    />
    <Route
      path="add"
      getComponent={(location, cb) => {
        System.import('./create/NoteCreate').then(loadRoute(cb)).catch(errorLoading)
      }}
    />
    <Route
      path="edit/:id"
      getComponent={(location, cb) => {
        System.import('./edit/NoteEdit').then(loadRoute(cb)).catch(errorLoading)
      }}
    />
  </Route>
)
