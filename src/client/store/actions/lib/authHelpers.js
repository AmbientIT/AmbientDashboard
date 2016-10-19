import fetch from 'isomorphic-fetch'

export const getToken = (ctx) => {
  return process.env.CLIENT ? localStorage.getItem('token') : ctx.cookies.get('token')
}

export const fetchLoggedUser = async ctx => {
  const token = getToken(ctx)
  return token
    ? await fetch('http://localhost:3000/auth/me', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json())
    : null
}

export const fetchGoogleAuth = async (body) => {
  return await fetch('/auth/google', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json())
}
