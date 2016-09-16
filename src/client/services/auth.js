import fetch from 'isomorphic-fetch'

const { CLIENT } = process.env

export const googleAuth = async data => {
  return await fetch('/auth/google', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json())
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
  return await fetch('auth/me', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(response => response.json())
}

export const logout = () => {
  if (CLIENT) {
    localStorage.removeItem('token')
  }
}
