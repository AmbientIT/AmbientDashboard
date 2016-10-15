/* eslint guard-for-in:0 */
/* eslint no-restricted-syntax:0 */
import jwt from 'jwt-simple'
import moment from 'moment'
import fetch from 'isomorphic-fetch'
import FormData from 'isomorphic-form-data'
import { env } from '../_core'

const googleUrls = {
  token: 'https://accounts.google.com/o/oauth2/token',
  profile: 'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
}

export const createJWT = user => {
  return jwt.encode({
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(env.token.VALIDITY, 'days').unix(),
  }, env.token.SECRET)
}

export const getGoogleToken = async params => {
  const fetchBody = Object.assign(params, {
    grant_type: 'authorization_code',
    client_secret: env.google.GOOGLESECRET,
  })

  const formDataReducer = (formData, key) => {
    formData.append(key, fetchBody[key])
    return formData
  }

  const response = await fetch(googleUrls.token, {
    method: 'post',
    body: Object.keys(fetchBody).reduce(formDataReducer, new FormData()),
  })
  return response.json()
}

export const getGoogleProfile = async accessToken => {
  const response = await fetch(googleUrls.profile, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return response.json()
}
