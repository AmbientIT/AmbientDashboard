import 'source-map-support/register'

import Koa from 'koa'
import Router from 'koa-router'
import convert from 'koa-convert'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import cors from 'kcors'
import {
  logger,
  env,
  connectDatabase,
} from './_core'
import createApi from './api'
import {
  notFoundHandler,
  webpackDevMiddleware,
  serveFrontMiddleware,
  // graphqlMiddleware,
  routerMiddleWare,
  errorMiddleware,
  exposeLoggedUserMiddleware,
} from './middlewares'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export default async () => {
  logger.debug('Creating server...', { scope: 'startup' })

  await connectDatabase(env.DB_URI)
  logger.debug(`connected to mongodb database : ${env.DB_URI}`, { scope: 'database' })

  const app = new Koa()
  app.use(errorMiddleware())
  if (env.DEV) {
    app.use(koaLogger())
    app.use(webpackDevMiddleware())
  }
  app.use(respond())
  app.use(convert(cors()))
  app.use(bodyParser())
  app.use(serveFrontMiddleware())
  app.use(exposeLoggedUserMiddleware())

  const apiRouter = new Router()
  const router = await createApi(apiRouter)

  app.use(routerMiddleWare(router))
  app.use(notFoundHandler())

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return app
}
