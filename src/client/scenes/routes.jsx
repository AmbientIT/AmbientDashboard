import React, { PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import Login from './auth/Login'
import Dashboard from './dashboard/Dashboard'
import Home from './dashboard/home/Home'
import Note from './dashboard/note/Note'
import NoteList from './dashboard/note/list/NoteList'
import NoteEdit from './dashboard/note/edit/NoteEdit'
import NoteCreate from './dashboard/note/create/NoteCreate'
import { forbiddenIfLoggedIn, requireAuth } from './guards'

export const errorLoading = err => {
  console.error('Dynamic page loading failed', err)
}

export const loadRoute = cb => module => cb(null, module.default)

const getRoutes = ({ store, ctx }) => {
  return (
    <Route path="">
      <Route
        path="/login"
        component={Login}
        onEnter={forbiddenIfLoggedIn(store, ctx)}
      />
      <Route
        path="/"
        component={Dashboard}
        onEnter={requireAuth(store, ctx)}
      >
        <IndexRoute
          component={Home}
        />
        <Route
          path="/note"
          component={Note}
          // getComponent={(location, cb) => {
          //   System.import('./dashboard/note/Note').then(loadRoute(cb)).catch(errorLoading)
          // }}
        >
          <IndexRoute
            component={NoteList}
            // getComponent={(location, cb) => {
            //   System.import('./dashboard/note/list/NoteList').then(loadRoute(cb)).catch(errorLoading)
            // }}
          />
          <Route
            path="/note/edit/:id"
            component={NoteEdit}
          />
          <Route
            path="/note/create"
            component={NoteCreate}
          />
        </Route>
      </Route>
    </Route>
  )
}

getRoutes.propTypes = {
  ctx: PropTypes.object,
  store: PropTypes.object,
}

export default getRoutes
