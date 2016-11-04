import React from 'react'
import { createSelector } from 'reselect'
import { NoteActionColumn } from '../../../components'

const getUsers = state => state.user.data

const getNotes = state => state.note.data

const getHandler = (state, { handleRemove, handlePrefetch }) => ({ handleRemove, handlePrefetch })

export const formatNoteListWithAuthor = createSelector(
  getUsers,
  getNotes,
  getHandler,
  (users, notes, { handleRemove, handlePrefetch }) => {
    return Object.keys(notes).map(key => ({
      ...notes[key],
      owner: users[notes[key].owner],
      action: <NoteActionColumn note={notes[key]} onNoteRemove={handleRemove} onNotePrefetch={handlePrefetch} />,
    }))
  },
)
