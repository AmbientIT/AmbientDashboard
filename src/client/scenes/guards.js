import { bindActionCreators } from 'redux'
import { getToken, logout } from '../services/auth'
import { getLoggedUserAndLogin } from '../store/actions/login.actions'

const logoutAndRedirect = (nextState, replace) => {
  logout()
  replace('/login')
}

export const requireAuth = ({ getState, dispatch }, ctx) => async (nextState, replace, callback) => {
  const { login } = getState()
  const auth = bindActionCreators({ getLoggedUserAndLogin }, dispatch)
  if (!login.loggedUser) {
    try {
      await auth.getLoggedUserAndLogin(ctx)
    } catch (err) {
      console.error('requireAuth error', err)
      logoutAndRedirect(nextState, replace)
    }
  }
  callback()
}
export const forbiddenIfLoggedIn = ({ getState, dispatch }, ctx) => async (nextState, replace, callback) => {
  const { login } = getState()
  const auth = bindActionCreators({ getLoggedUserAndLogin }, dispatch)
  if (login.loggedUser) {
    replace({ nextPathname: nextState.location.pathname }, '/note')
  } else {
    try {
      if (getToken(ctx)) {
        await auth.getLoggedUserAndLogin(ctx)
        replace('/note')
      }
    } catch (err) {
      console.error('forbiddenIfLoggedInError', err)
      logout()
    }
  }
  callback()
}
