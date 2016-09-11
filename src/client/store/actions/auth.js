import { googleAuth, whoAmI } from '../_services/auth'

export const LOGIN_FINISH = 'LOGIN_FINISH'
export const LOGIN_LOADING = 'LOGIN_LOADING'

export const googleLogin = (authData) => {
  return dispatch => {
    dispatch({ type: LOGIN_LOADING })
    return googleAuth(authData)
      .then(data => {
        localStorage.setItem('token', data.token)
        dispatch({
          type: LOGIN_FINISH,
          payload: data.user,
        })
      })
  }
}

export const getLoggedUser = () => {
  return dispatch => {
    dispatch({ type: LOGIN_LOADING })
    return whoAmI()
      .then(user => {
        dispatch({
          type: LOGIN_FINISH,
          payload: user,
        })
      })
  }
}
