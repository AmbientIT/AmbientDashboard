import serve from 'koa-static'
import views from 'koa-views'
import compose from 'koa-compose'

export const serveFrontMiddleware = () => compose([
  views(`${process.cwd()}/src/views`, {
    extension: 'pug',
  }),
  serve(`${process.cwd()}/src/public`),
])
