import React, { PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import Login from './auth/Login'
import Dashboard from './dashboard/Dashboard'
import Home from './dashboard/home/Home'
import Note from './dashboard/note/Note'
import NoteList from './dashboard/note/list/NoteList'
import NoteEdit from './dashboard/note/edit/NoteEdit'
import NoteCreate from './dashboard/note/create/NoteCreate'
import { forbiddenIfLoggedIn, requireAuth } from '../lib/auth/guard'

const getRoutes = ({ store, ctx }) => {
  return (
    <Route path="">
      <Route path="/login" component={Login} onEnter={forbiddenIfLoggedIn(store, ctx)} />
      <Route path="/" component={Dashboard} onEnter={requireAuth(store, ctx)}>
        <IndexRoute component={Home} />
        <Route path="/note" component={Note}>
          <IndexRoute component={NoteList} />
          <Route path="/note/edit/:id" component={NoteEdit} />
          <Route path="/note/create" component={NoteCreate} />
        </Route>
      </Route>
    </Route>
  )
}

getRoutes.propTypes = {
  ctx: PropTypes.shape(),
  store: PropTypes.shape(),
}

export default getRoutes
