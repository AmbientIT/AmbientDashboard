import actions from 'store/actions' // eslint-disable-line
import user from 'containers/login/user' //eslint-disable-line

const {
  ADD_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  FETCH_ONE_NOTE,
} = actions.notes

const { APOLLO_QUERY_RESULT } = actions.apollo

class Note {
  constructor({ id, name, date, owner }) {
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
    case APOLLO_QUERY_RESULT :
    case FETCH_ONE_NOTE :
      return new Note(Object.assign(state, { owner: user(state.user, action) }))
    case UPDATE_NOTE :
      if (state.id !== action.payload.id) {
        return state
      }
      return new Note(action.payload)
    case REMOVE_NOTE :
      return state.id !== action.payload
    default :
      return state
  }
}
