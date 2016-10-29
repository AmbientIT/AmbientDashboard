/**
 * The "Not Found" handler.
 *
 * @param  {Koa.Context} ctx
 * The Koa context.
 */
export const notFoundMiddleware = () => ctx => {
  ctx.notFound('Whatever you were looking for, we ain\'t got it, son.')
}
