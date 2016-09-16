/* eslint guard-for-in:0 */
/* eslint no-restricted-syntax:0 */
import jwt from 'jwt-simple'
import moment from 'moment'
import fetch from 'isomorphic-fetch'
import FormData from 'isomorphic-form-data'
import { env } from '../_core'

export const createJWT = (user) => {
  return jwt.encode({
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(env.token.VALIDITY, 'days').unix(),
  }, env.token.SECRET)
}

export const getGoogleToken = (params) => {
  const formData = new FormData()
  const fetchBody = Object.assign(params, {
    grant_type: 'authorization_code',
    client_secret: env.google.GOOGLESECRET,
  })

  for (const key in fetchBody) {
    formData.append(key, fetchBody[key])
  }

  return fetch('https://accounts.google.com/o/oauth2/token', {
    method: 'post',
    body: formData,
  }).then(response => response.json())
}

export const getGoogleProfile = (accessToken) => {
  return fetch('https://www.googleapis.com/plus/v1/people/me/openIdConnect', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(response => response.json())
}
