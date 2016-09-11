import { LOGIN_LOADING, LOGIN_FINISH } from '../actions/auth'
import user from './user'

const initialState = {
  isLoading: true,
  loggedUser: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FINISH :
      return {
        isLoading: false,
        loggedUser: user(action.payload, action),
      }
    case LOGIN_LOADING :
      state.isLoading = true
      return state
    default :
      return state
  }
}
