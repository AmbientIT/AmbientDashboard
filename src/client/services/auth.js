import http from 'axios'

export const googleAuth = async data => {
  let authData
  try {
    authData = await http.post('/auth/google', data)
  } catch (err) {
    console.error(err)
  }
  return authData.data
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
  return http.get('auth/me', {
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
