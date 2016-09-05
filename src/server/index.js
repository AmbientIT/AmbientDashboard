import Koa from 'koa'
import Router from 'koa-router'
import convert from 'koa-convert'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import cors from 'kcors'
import { scopePerRequest } from 'awilix-koa'
import createApis from './api'
import { logger, getConfiguredContainer, env } from './_core'
import {
  notFoundHandler,
  webpackDevMiddleware,
  serveFrontMiddleware,
} from './middlewares'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export default async () => {
  logger.debug('Creating server...', { scope: 'startup' })
  const app = new Koa()
  app.use(respond())
  app.use(convert(cors()))
  app.use(bodyParser())
  if (env.DEV) {
    app.use(koaLogger())
    app.use(webpackDevMiddleware())
  }
  app.use(serveFrontMiddleware())

// Container is configured with our services and whatnot.
  const container = getConfiguredContainer()

// Creates an Awilix scope per request. Check out the awilix-koa
// docs for details: https://github.com/jeffijoe/awilix-koa
  app.use(scopePerRequest(container))

// Adds middleware that creates a new Container Scope for each request.
  app.use((ctx, next) => {
    // faking authentication just to demo Awilix capabilities
    ctx.state.container.registerValue({
      currentUser: {
        id: ctx.request.query.userId,
      },
    })
    return next()
  })

  const router = new Router()
  try {
    // Create the API's.
    createApis(router)
  } catch (e) {
    console.error(e)
  }

  // Install routes
  app.use(router.allowedMethods())
  app.use(router.routes())

  // Default handler when nothing stopped the chain.
  app.use(notFoundHandler)

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return app
}
