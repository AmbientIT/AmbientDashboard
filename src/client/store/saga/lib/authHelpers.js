import jsCookie from 'js-cookie'

export const removeToken = () => {
  if (process.env.CLIENT) {
    localStorage.removeItem('token')
    jsCookie.remove('token')
  }
}

export const setToken = token => {
  if (process.env.CLIENT && token) {
    jsCookie.set('token', token)
    localStorage.setItem('token', token)
  }
}
