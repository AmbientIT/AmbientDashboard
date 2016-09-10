import React from 'react'
import { Route, IndexRoute } from 'react-router'

import noteRoute from './note/note.route'
import Dashboard from './Dashboard'
import Home from './Home'

import { viewerQuery } from './_queries/viewer'

export default (
  <Route component={Dashboard}>
    <IndexRoute	component={Home} queries={viewerQuery} />
    {noteRoute}
  </Route>
)
