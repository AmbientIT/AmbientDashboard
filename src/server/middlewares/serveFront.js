import serve from 'koa-static'
import compose from 'koa-compose'

export const serveFrontMiddleware = () => compose([
  serve(`${process.cwd()}/src/public`),
])
