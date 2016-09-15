import { whoAmI, getToken, logout } from 'services/auth' //eslint-disable-line
import { LOGIN_FINISH } from 'containers/login/login.actions' //eslint-disable-line
import actions from 'store/actions' //eslint-disable-line
import { bindActionCreators } from 'redux'

const { getLoggedUserAndLogin } = actions.login

const logoutAndRedirect = (nextState, replace) => {
  logout()
  replace({ nextPathname: nextState.location.pathname }, '/login')
}

export const requireAuth = ({ getState, dispatch }) => async (nextState, replace, callback) => {
  const { login } = getState()
  const auth = bindActionCreators({ getLoggedUserAndLogin }, dispatch)
  if (!login.loggedUser) {
    try {
      await auth.getLoggedUserAndLogin()
    } catch (err) {
      logoutAndRedirect(nextState, replace)
    }
  }
  callback()
}
export const forbiddenIfLoggedIn = ({ getState, dispatch }) => async (nextState, replace, callback) => {
  const { login } = getState()
  const auth = bindActionCreators({ getLoggedUserAndLogin }, dispatch)
  if (login.loggedUser) {
    replace({ nextPathname: nextState.location.pathname }, '/note')
  } else {
    try {
      if (getToken()) {
        await auth.getLoggedUserAndLogin()
        replace({ nextPathname: nextState.location.pathname }, '/note')
      }
    } catch (err) {
      logoutAndRedirect(nextState, replace)
    }
  }
  callback()
}
