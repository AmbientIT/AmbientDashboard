import { googleAuth, whoAmI } from 'services/auth' // eslint-disable-line

export const LOGIN_FINISH = 'LOGIN_FINISH'
export const LOGIN_LOADING = 'LOGIN_LOADING'

export const googleLogin = (authData) => dispatch => {
  dispatch({ type: LOGIN_LOADING })
  return googleAuth(authData)
    .then(({ user, token }) => {
      localStorage.setItem('token', token)
      dispatch({
        type: LOGIN_FINISH,
        payload: user,
      })
    })
  .catch(err => console.error(err))
}


export const getLoggedUser = () => dispatch => {
  dispatch({ type: LOGIN_LOADING })
  return whoAmI()
    .then(user => dispatch({
      type: LOGIN_FINISH,
      payload: user,
    }))
    .catch(err => console.error(err))
}
