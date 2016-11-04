import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_START, LOGOUT_ERROR, LOGOUT_SUCCESS } from '../actions/auth'

const initialState = {
  isLoading: true,
  loggedUser: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
    case LOGOUT_START:
      return {
        ...state,
        isLoading: true,
      }
    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        loggedUser: action.payload.data.result,
      }
    case LOGOUT_SUCCESS:
    case LOGOUT_ERROR:
    case LOGIN_ERROR:
      return {
        isLoading: false,
        loggedUser: null,
      }
    default :
      return state
  }
}
