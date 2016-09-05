import Koa from 'koa'
import convert from 'koa-convert'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import cors from 'kcors'
// import { scopePerRequest } from 'awilix-koa'
import {
  logger,
  getConfiguredContainer,
  env,
  connectDatabase,
} from './_core'
import {
  notFoundHandler,
  webpackDevMiddleware,
  serveFrontMiddleware,
  graphqlMiddleware,
  passportMiddleware,
  sessionMiddleware,
  routerMiddleWare,
} from './middlewares'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export default async () => {
  logger.debug('Creating server...', { scope: 'startup' })
  getConfiguredContainer()
  const app = new Koa()
  app.use(sessionMiddleware())
  app.use(respond())
  app.use(convert(cors()))
  app.use(bodyParser())
  if (env.DEV) {
    app.use(koaLogger())
    app.use(webpackDevMiddleware())
  }
  app.use(serveFrontMiddleware())

  app.use(passportMiddleware())
  app.use(graphqlMiddleware())
  app.use(routerMiddleWare())
  // Default handler when nothing stopped the chain.
  app.use(notFoundHandler())

  await connectDatabase(env.DB_URI)

  logger.debug(`connected to mongodb database : ${env.DB_URI}`, { scope: 'database' })
  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return app
}
