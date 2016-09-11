import {
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  FETCH_NOTES,
  FETCH_ONE_NOTE,
  LOADING_NOTE,
} from '../actions/note'
import {
  ADD_ATTACHEMENT,
  REMOVE_ATTACHEMENT,
} from '../actions/attachement'
import note from './note'
import attachement from './attachement'

const initialState = {
  isLoading: false,
  list: [],
  selectedNote: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_NOTE :
      state.isLoading = true
      return Object.assign({}, state)
    case ADD_NOTE :
      state.isLoading = false
      state.selectedNote = note(action.payload, action)
      state.list = [...state.list, state.selectedNote]
      return Object.assign({}, state)
    case UPDATE_NOTE :
      state.isLoading = false
      state.list = state.list.map(n => note(n, action))
      return Object.assign({}, state)
    case REMOVE_NOTE :
      state.isLoading = false
      state.list = state.list.filter(n => note(n, action))
      return Object.assign({}, state)
    case FETCH_NOTES :
      state.isLoading = false
      state.list = action.payload.map(n => note(n, action))
      return Object.assign({}, state)
    case FETCH_ONE_NOTE :
      state.selectedNote = note(action.payload, action)
      state.list = [...state.list, state.selectedNote]
      return Object.assign({}, state)
    case ADD_ATTACHEMENT :
      state.selectedNote.attachements = attachement(state.selectedNote.attachements, action)
      state.selectedNote = Object.assign({}, state.selectedNote)
      return Object.assign({}, state)
    case REMOVE_ATTACHEMENT :
      state.selectedNote.attachements = attachement(state.selectedNote.attachements, action)
      state.selectedNote = Object.assign({}, state.selectedNote)
      return Object.assign({}, state)
    default :
      return state
  }
}
