import actions from 'store/actions' // eslint-disable-line
import note from './note' // eslint-disable-line
import attachement from './attachement' // eslint-disable-line

const {
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  LOADING_NOTE,
  ADD_ATTACHEMENT,
  REMOVE_ATTACHEMENT,
} = actions.notes

const { APOLLO_QUERY_RESULT } = actions.apollo

const initialState = {
  isLoading: false,
  list: [],
  selectedNote: {},
  count: 0,
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
      console.log(state.list)
      return Object.assign({}, state)
    case APOLLO_QUERY_RESULT : // todo find something this is not cool
      state.isLoading = false
      if (action.result.data) {
        if (action.result.data.viewer) {
          if (action.result.data.viewer.notes) {
            // we get a list
            state.count = action.result.data.viewer.notes.count
            state.list = action.result.data.viewer.notes.edges
              .map(({ node }) => note(node, action))
          }
        } else if (action.result.data.note) {
          // we get a single note
          state.selectedNote = action.result.data.note
        }
      }
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
