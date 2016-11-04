// import { fetchLoggedUser } from './lib/authHelpers'

export const LOGIN = 'LOGIN'
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const LOGOUT = 'LOGOUT'
export const LOGOUT_START = 'LOGOUT_START'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export const login = payload => ({
  type: LOGIN,
  payload,
})

export const logout = () => ({
  type: LOGOUT,
})
