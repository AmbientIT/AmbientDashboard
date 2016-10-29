import fs from 'fs'
import compose from 'koa-compose'
import morgan from 'koa-morgan'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import koaCompress from 'koa-compress'
import cors from 'kcors'

import createApi from '../api'
import { getModels } from '../models'
import { generateBlueprint, logger, env } from '../_core'

import { renderingMiddleware } from './common/rendering'
import { exposeLoggedUserMiddleware } from './common/exposeLoggedUser'
import { notFoundMiddleware } from './common/notFound'
import { webpackDevMiddleware } from './dev/webpack'

export const errorMiddleware = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    logger.error(err.message, { scope: err.status })
    ctx.send(err.status || 500, err)
  }
}
export const devMiddleware = () => compose([
  morgan('dev'),
  webpackDevMiddleware(),
])

export const prodMiddleware = () => compose([
  morgan('combined', { stream: fs.createWriteStream(`${process.cwd()}/logs/access.log`, { flags: 'a' }) }),
  koaCompress(),
])

export const appMiddleware = async ({ rootRouter, api, bluePrint }) => {
  if (api) {
    await createApi(rootRouter)
  }
  if (bluePrint) {
    const models = await getModels()
    models.forEach(model => generateBlueprint(rootRouter, model))
  }
  return compose([
    respond(),
    cors({
      origin(ctx) {
        return env.whiteListUrl.indexOf(ctx.request.headers.origin)
          ? ctx.request.headers.origin
          : null
      },
    }),
    bodyParser(),
    serve(`${process.cwd()}/src/public`),
    exposeLoggedUserMiddleware(),
    rootRouter.allowedMethods(),
    rootRouter.routes(),
    renderingMiddleware(),
    notFoundMiddleware(),
  ])
}
