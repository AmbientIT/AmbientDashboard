import React from 'react'
import { IndexRoute } from 'react-router/es6'
import { loadRoute, errorLoading } from 'containers/routes' //eslint-disable-line
import { routeName as parentRoute } from '../note.route'

export const parent = parentRoute

export default () => {
  return (
    <IndexRoute
      getComponent={(location, cb) => {
        System.import('./NoteList').then(loadRoute(cb)).catch(errorLoading)
      }}
      key="noteList"
    />
  )
}
