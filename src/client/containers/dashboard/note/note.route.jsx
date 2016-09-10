import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Note from './Note'
import NoteList from './list/NoteList'
import NoteCreate from './create/NoteCreate'
import NoteEdit, { noteQuery } from './edit/NoteEdit'
import { viewerQuery } from '../_queries/viewer'

export default (
  <Route path="/note" component={Note}>
    <IndexRoute	component={NoteList} queries={viewerQuery} />
    <Route path="add" component={NoteCreate} queries={viewerQuery} />
    <Route path="edit/:id" component={NoteEdit} queries={noteQuery} />
  </Route>
)
