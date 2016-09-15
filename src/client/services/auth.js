import http from 'axios'

const { CLIENT } = process.env

export const googleAuth = async data => {
  return await http.post('/auth/google', data)
    .then(authData => authData.data)
}

export const getToken = () => {
  let response
  if (CLIENT) {
    response = localStorage.getItem('token')
  } else {
    response = ''
  }
  return response
}

export const whoAmI = async () => {
  return await http.get('auth/me', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(response => response.data)
}

export const logout = () => {
  if (CLIENT) {
    localStorage.removeItem('token')
  }
}
