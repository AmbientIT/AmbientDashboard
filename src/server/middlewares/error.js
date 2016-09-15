import { logger } from '../_core'

export const errorMiddleware = () => async (ctx, next) => {
  try {
    await next()
  } catch ({ status, message }) {
    logger.error(message, { scope: status })
    ctx.send(status, { message })
  }
}
