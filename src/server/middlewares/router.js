import compose from 'koa-compose'

export const routerMiddleWare = router => compose([
  router.allowedMethods(),
  router.routes(),
])
