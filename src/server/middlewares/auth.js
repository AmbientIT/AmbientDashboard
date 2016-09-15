import jwt from 'jwt-simple'
import createError from 'http-errors'
import { env } from '../_core'

export const exposeLoggedUserMiddleware = () => async (ctx, next) => {
  try {
    if (ctx.request.header.authorization) {
      const token = ctx.request.header.authorization.split(' ')[1]
      console.log('token', token)
      if (token) {
        ctx.payload = jwt.decode(token, env.token.SECRET)
      }
    }
  } catch (err) {
    throw createError(500, err.message)
  } finally {
    await next()
  }
}
