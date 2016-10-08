import jwt from 'jwt-simple'
import createError from 'http-errors'
import { env } from '../_core'

export const exposeLoggedUserMiddleware = () => async (ctx, next) => {
  try {
    let token
    if (ctx.cookies.get('token')) {
      console.log(ctx.cookies.get('token'))
      token = ctx.cookies.get('token')
    } else if (ctx.request.header.authorization) {
      token = ctx.request.header.authorization.split(' ')[1]
    }
    if (token) {
      ctx.payload = jwt.decode(token, env.token.SECRET)
    }
  } catch (err) {
    throw createError(500, err.message)
  } finally {
    await next()
  }
}
