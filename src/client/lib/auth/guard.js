import { fetchLoggedUser, getToken } from './lib/guardHelper'
import { LOGIN_SUCCESS } from '../../store/actions/auth'

export const requireAuth = ({ getState, dispatch }, ctx) => async (nextState, replace, callback) => {
  const { auth } = getState()
  try {
    if (!auth.loggedUser) {
      const token = getToken(ctx)
      if (!token) {
        replace('/login')
      } else {
        const user = await fetchLoggedUser(ctx, token)
        if (!user) {
          replace('/login')
        } else {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { data: user },
          })
        }
      }
    }
    callback()
  } catch (err) {
    console.error(err)
    replace('/login')
    callback()
    throw err
  }
}

export const forbiddenIfLoggedIn = ({ getState }, ctx) => async (nextState, replace, callback) => {
  try {
    const { auth } = getState()
    if (auth.loggedUser || getToken(ctx)) {
      replace('/')
    }
  } catch (err) {
    console.error(err)
    throw err
  }
  callback()
}
