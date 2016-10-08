import fetch from 'isomorphic-fetch'

const { CLIENT } = process.env

export const googleAuth = async data => {
  return await fetch('/auth/google', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(response => {
      window.document.cookie = `token=${response.token}`
      return response
    })
}

export const getToken = (ctx) => {
  let response
  if (CLIENT) {
    response = localStorage.getItem('token')
  } else {
    response = ctx.cookies.get('token')
  }
  return response
}

export const whoAmI = async (ctx) => {
  return await fetch('http://localhost:3000/auth/me', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${getToken(ctx)}`,
    },
  }).then(response => response.json())
}

export const logout = () => {
  if (CLIENT) {
    localStorage.removeItem('token')
  }
}
