import {
  ADD_NOTE,
  UPDATE_NOTE,
  FETCH_NOTES,
  REMOVE_NOTE,
  FETCH_ONE_NOTE,
} from '../actions/note'

import user from './user'

class Note {
  constructor(id, name, date, owner) {
    this.id = id || Date.now()
    this.name = name
    this.date = new Date(date)
    this.owner = owner
    this.files = []
  }
}

export default (state, action) => {
  switch (action.type) {
    case ADD_NOTE :
    case FETCH_NOTES :
    case FETCH_ONE_NOTE :
      return new Note(
        state.id,
        state.name,
        state.date,
        user(state.user, action),
       )
    case UPDATE_NOTE :
      if (state.id !== action.payload.id) {
        return state
      }
      return new Note(action.payload.id, action.payload.name, action.payload.date)
    case REMOVE_NOTE :
      return state.id !== parseInt(action.payload, 10)
    default :
      return state
  }
}
