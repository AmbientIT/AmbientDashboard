import { bindActionCreators } from 'redux'
import { getLoggedUserAndLogin } from './auth/_actions/auth.actions'

export const requireAuth = ({ getState, dispatch }, ctx) => async (nextState, replace, callback) => {
  const { auth } = getState()
  const authActions = bindActionCreators({ getLoggedUserAndLogin }, dispatch)
  if (!auth.loggedUser) {
    const user = await authActions.getLoggedUserAndLogin(ctx)
    if (!user) {
      replace('/login')
    }
  }
  callback()
}

export const forbiddenIfLoggedIn = ({ getState, dispatch }, ctx) => async (nextState, replace, callback) => {
  const { auth } = getState()
  const authActions = bindActionCreators({ getLoggedUserAndLogin }, dispatch)
  if (auth.loggedUser) {
    replace('/')
  } else if (await authActions.getLoggedUserAndLogin(ctx, replace)) {
    replace('/')
  }
  callback()
}
