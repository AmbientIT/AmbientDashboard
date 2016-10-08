import { LOGIN_LOADING, LOGIN_FINISH, LOGIN_ERROR } from '../actions/login.actions'

const initialState = {
  isLoading: true,
  loggedUser: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FINISH :
      action.payload.id = action.payload._id || action.payload.id
      return {
        isLoading: false,
        loggedUser: action.payload,
      }
    case LOGIN_LOADING :
      state.isLoading = true
      return { ...state }
    case LOGIN_ERROR :
      state.isLoading = true
      return { ...state }
    default :
      return state
  }
}
