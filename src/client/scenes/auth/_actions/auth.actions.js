import { fetchLoggedUser, fetchGoogleAuth } from './lib/authHelpers'

export const LOGIN_FINISH = 'LOGIN_FINISH'
export const LOGIN_LOADING = 'LOGIN_LOADING'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'

const dispatchError = (err, dispatch) => dispatch({
  type: LOGIN_ERROR,
  payload: err,
})

export const googleLogin = ({ code, clientId, redirectUri }) => async dispatch => {
  dispatch({ type: LOGIN_LOADING })
  try {
    dispatch({
      type: LOGIN_FINISH,
      payload: await fetchGoogleAuth({ code, clientId, redirectUri }),
    })
  } catch (err) {
    dispatchError(err, dispatch)
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
      dispatchError(new Error('no token'), dispatch)
    }
  } catch (err) {
    dispatchError(err, dispatch)
  }
  return user
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}
