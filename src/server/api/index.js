import { listModules } from 'awilix'

/**
 * Resolves and creates API controllers.
 *
 * @param  {KoaRouter} router
 * The router to pass to the API factories.
 */
export default (router) => {
  listModules('./**/*.router.js', { cwd: __dirname })
    .forEach(module => require(module.path).default(router))
}
