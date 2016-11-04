import 'source-map-support/register'

import Koa from 'koa'
import Router from 'koa-router'
import { logger, env } from './_core'
import { appMiddleware, devMiddleware, prodMiddleware, errorMiddleware } from './middlewares'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export default async () => {
  logger.debug('Creating server...', { scope: 'startup' })

  // await connectDatabase(env.DB_URI)
  // logger.info(`connected to mongodb database : ${env.DB_URI}`, { scope: 'database' })

  const app = new Koa()
  app.use(errorMiddleware())
  app.use(env.DEV ? devMiddleware() : prodMiddleware())
  app.use(await appMiddleware({
    rootRouter: new Router(),
    bluePrint: true,
    api: true,
  }))

  logger.info('Server created, ready to listen', { scope: 'startup' })
  return app
}
