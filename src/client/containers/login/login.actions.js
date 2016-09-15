import { googleAuth, whoAmI, getToken } from 'services/auth' // eslint-disable-line

export const LOGIN_FINISH = 'LOGIN_FINISH'
export const LOGIN_LOADING = 'LOGIN_LOADING'

export const googleLogin = (authData) => async dispatch => {
  dispatch({ type: LOGIN_LOADING })
  const { user, token } = await googleAuth(authData)
  localStorage.setItem('token', token)
  dispatch({
    type: LOGIN_FINISH,
    payload: user,
  })
}


export const getLoggedUserAndLogin = () => dispatch => {
  return getToken()
    ? whoAmI().then(
        user => dispatch({
          type: LOGIN_FINISH,
          payload: user,
        })
      )
    : Promise.reject(new Error('no token'))
}
