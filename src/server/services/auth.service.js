import jwt from 'jwt-simple'
import moment from 'moment'
import request from 'request-promise'
import { env } from '../_core'

export const createJWT = (user) => {
  return jwt.encode({
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(env.token.VALIDITY, 'days').unix(),
  }, env.token.SECRET)
}

export const getGoogleToken = (params) => {
  return request.post('https://accounts.google.com/o/oauth2/token', {
    json: true,
    form: Object.assign(params, {
      grant_type: 'authorization_code',
      client_secret: env.google.GOOGLESECRET,
    }),
  })
}

export const getGoogleProfile = (accessToken) => {
  return request.get({
    url: 'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
    headers: { Authorization: `Bearer ${accessToken}` },
    json: true,
  })
}
