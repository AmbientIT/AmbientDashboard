import moment from 'moment'
import createError from 'http-errors'
import User from '../../models/mongoose/user'

export default async (ctx, next) => {
  if (!ctx.payload) {
    throw createError(401, 'Please make sure your request has an Authorization header')
  }

  if (ctx.payload.exp <= moment().unix()) {
    throw createError(401, 'Token has expired')
  }

  const user = await User.findOne({ _id: ctx.payload.sub })
  if (user) {
    ctx.user = user
  } else {
    throw createError(401, 'Unknown user (bad token)')
  }
  await next()
}
