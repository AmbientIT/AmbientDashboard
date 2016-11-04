import { normalize } from 'normalizr'
import fetch from 'isomorphic-fetch'
import { userSchema } from '../../../store/models'

export const getToken = ctx => {
  return process.env.CLIENT ? localStorage.getItem('token') : ctx.cookies.get('token')
}

export const fetchLoggedUser = async (ctx, token) => {
  const userData = await fetch('http://localhost:3000/auth/me', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json())

  return normalize(userData, userSchema)
}
