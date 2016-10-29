import fs from 'fs'
import compose from 'koa-compose'
import morgan from 'koa-morgan'
import convert from 'koa-convert'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import cors from 'kcors'

import { renderingMiddleware } from './common/rendering'
import { exposeLoggedUserMiddleware } from './common/exposeLoggedUser'
import { routerMiddleWare } from './common/router'
import { notFoundMiddleware } from './error/notFound'
import { webpackDevMiddleware } from './dev/webpack'

export * from './error/error'

export const finalMiddleware = router => compose([
  routerMiddleWare(router),
  renderingMiddleware(),
  notFoundMiddleware(),
])

export const devMiddleware = () => compose([
  morgan('dev'),
  webpackDevMiddleware(),
])

export const prodMiddleware = () => compose([
  morgan('combined', { stream: fs.createWriteStream(`${process.cwd()}/logs/access.log`, { flags: 'a' }) }),
])

export const commonMiddleware = () => compose([
  respond(),
  convert(cors()),
  bodyParser(),
  serve(`${process.cwd()}/src/public`),
  exposeLoggedUserMiddleware(),
])
