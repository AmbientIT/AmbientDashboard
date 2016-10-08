import { logger } from '../_core'

export const errorMiddleware = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error(err)
    logger.error(err.message, { scope: err.status })
    ctx.send(err.status || 500, err)
  }
}
