import 'source-map-support/register'

import Koa from 'koa'
import Router from 'koa-router'
import { logger, env, connectDatabase, generateBlueprint } from './_core'
import createApi from './api'
import { getModels } from './models'
import { commonMiddleware, devMiddleware, prodMiddleware, finalMiddleware, errorMiddleware } from './middlewares'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export default async () => {
  logger.debug('Creating server...', { scope: 'startup' })

  await connectDatabase(env.DB_URI)
  logger.info(`connected to mongodb database : ${env.DB_URI}`, { scope: 'database' })

  const app = new Koa()
  app.use(errorMiddleware())
  app.use(env.DEV ? devMiddleware() : prodMiddleware())
  app.use(commonMiddleware())
  const apiRouter = new Router()
  // blueprint restfull api
  const models = await getModels()
  models.forEach(model => generateBlueprint(apiRouter, model))
  // load other endpoints
  const router = await createApi(apiRouter)

  app.use(finalMiddleware(router))

  logger.info('Server created, ready to listen', { scope: 'startup' })
  return app
}
