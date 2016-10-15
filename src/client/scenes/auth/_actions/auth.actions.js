import { fetchLoggedUser, fetchGoogleAuth } from './lib/authHelpers'

export const LOGIN_FINISH = 'LOGIN_FINISH'
export const LOGIN_LOADING = 'LOGIN_LOADING'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'

export const googleLogin = ({ code, clientId, redirectUri }) => async dispatch => {
  dispatch({ type: LOGIN_LOADING })
  try {
    const payload = await fetchGoogleAuth({ code, clientId, redirectUri })
    dispatch({ type: LOGIN_FINISH, payload })
  } catch (err) {
    dispatch({ type: LOGIN_ERROR, payload: err })
  }
}

export const getLoggedUserAndLogin = (ctx) => async dispatch => {
  let user
  try {
    dispatch({ type: LOGIN_LOADING })
    user = await fetchLoggedUser(ctx)
    dispatch({
      type: user ? LOGIN_FINISH : LOGIN_ERROR,
      payload: user ? { user } : new Error('no token'),
    })
  } catch (err) {
    dispatch({ type: LOGIN_ERROR, payload: err })
  }
  return user
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}
