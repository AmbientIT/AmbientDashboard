import GoogleAuthPopup from './lib/GoogleAuthPopup'
import { fetchLoggedUser, fetchGoogleAuth } from './lib/authHelpers'

export const LOGIN_FINISH = 'LOGIN_FINISH'
export const LOGIN_LOADING = 'LOGIN_LOADING'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'

export const googleLogin = ({ clientId, redirectUri }) => async dispatch => {
  try {
    dispatch({ type: LOGIN_LOADING })
    const popup = new GoogleAuthPopup('hey yo !!!')
    const { code } = await popup.show()
    dispatch({
      type: LOGIN_FINISH,
      payload: await fetchGoogleAuth({ code, clientId, redirectUri }),
    })
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
      payload: err,
    })
  }
}

export const getLoggedUserAndLogin = (ctx) => async dispatch => {
  let user
  try {
    dispatch({ type: LOGIN_LOADING })
    user = await fetchLoggedUser(ctx)
    if (user) {
      dispatch({
        type: LOGIN_FINISH,
        payload: { user },
      })
    } else {
      dispatch({
        type: LOGIN_ERROR,
        payload: new Error('no token'),
      })
    }
  } catch (err) {
    dispatch({
      type: LOGIN_ERROR,
      payload: err,
    })
  }
  return user
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}
