import jsCookie from 'js-cookie'
import { LOGIN_LOADING, LOGIN_FINISH, LOGIN_ERROR, LOGOUT } from '../actions/auth'

const initialState = {
  isLoading: true,
  loggedUser: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FINISH :
      if (action.payload.token) {
        jsCookie.set('token', action.payload.token)
        localStorage.setItem('token', action.payload.token)
      }
      return {
        isLoading: false,
        loggedUser: Object.assign({ id: action.payload.user._id }, action.payload.user),
      }
    case LOGIN_LOADING :
      return Object.assign(state, { isLoading: true })
    case LOGIN_ERROR :
      return Object.assign(state, { isLoading: false })
    case LOGOUT :
      jsCookie.remove('token')
      localStorage.removeItem('token')
      return Object.assign(state, { loggedUser: null })
    default :
      return state
  }
}
