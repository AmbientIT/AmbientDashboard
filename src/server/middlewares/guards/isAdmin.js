import createError from 'http-errors'

export default async (ctx, next) => {
  if (ctx.user.role !== 'admin') {
    throw createError(401, 'Restricted access, Admin only')
  } else {
    await next()
  }
}
