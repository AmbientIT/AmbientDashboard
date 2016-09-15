import Router from 'koa-router'
import compose from 'koa-compose'
import createApis from '../api'
import { logger } from '../_core'

const router = new Router()
try {
  createApis(router)
} catch (err) {
  logger.error(err, { scope: 'creating api' })
}

export const routerMiddleWare = () => compose([
  router.allowedMethods(),
  router.routes(),
])
