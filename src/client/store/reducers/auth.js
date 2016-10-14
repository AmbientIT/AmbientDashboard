import jsCookie from 'js-cookie'
import { LOGIN_LOADING, LOGIN_FINISH, LOGIN_ERROR, LOGOUT } from '../../scenes/auth/_actions/auth.actions'

const initialState = {
  isLoading: true,
  loggedUser: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FINISH :
      if (action.payload.token) {
        // document.cookie = `token=${action.payload.token}`
        jsCookie.set('token', action.payload.token)
        // jsCookie.set('locale', navigator.language)
        localStorage.setItem('token', action.payload.token)
      }
      action.payload.user.id = action.payload.user._id || action.payload.user.id
      delete action.payload.user._id
      return {
        isLoading: false,
        loggedUser: action.payload.user,
      }
    case LOGIN_LOADING :
      state.isLoading = true
      return { ...state }
    case LOGIN_ERROR :
      state.isLoading = false
      return { ...state }
    case LOGOUT :
      state.loggedUser = null
      // document.cookie = 'token='
      jsCookie.remove('token')
      localStorage.removeItem('token')
      return { ...state }
    default :
      return state
  }
}
