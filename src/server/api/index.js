import { listModules } from '../_core'

/**
 * Resolves and creates API controllers.
 *
 * @param  {KoaRouter} router
 * The router to pass to the API factories.
 */
export default async router => {
  const modules = await listModules(`${__dirname}/**/*.router.*`)
  modules.forEach(module => module(router))
  return router
}
