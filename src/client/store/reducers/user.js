import { note } from '../actions'
import { LOGIN_SUCCESS } from '../actions/auth'

const initialState = {
  data: {},
  filter: {},
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case note.constants.NOTE_FETCH_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data.entities.user,
        },
      }
    default:
      return state
  }
}
