import axios from 'axios'
// todo use async native storage (react native and browser)
const http = axios.create()
http.defaults.baseURL = 'http://localhost:3000/api'

export const googleAuth = (data) => {
  return http.post('auth/google', data)
    .then(response => response.data)
    .catch(error => console.error(error))
}

export const getToken = () => {
  let response
  if (global.localStorage) {
    response = localStorage.getItem('token')
  } else {
    response = ''
  }
  return response
}

export const whoAmI = () => {
  return axios.get('auth/me', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

/* eslint no-extra-boolean-cast: 0 */
export const isAuthenticated = () => {
  let response
  if (global.localStorage) {
    response = !!localStorage.getItem('token')
  } else {
    response = true
  }
  return response
}

export const logout = () => {
  if (global.localStorage) {
    localStorage.removeItem('token')
  }
}

export const requireAuth = (nextState, replace) => {
  console.log('require auth', nextState, replace)
  if (!isAuthenticated()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    })
  }
}

export const forbiddenIfLoggedIn = (nextState, replace) => {
  if (isAuthenticated()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    })
  }
}
