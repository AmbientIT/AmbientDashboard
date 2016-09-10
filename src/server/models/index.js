import { listModules } from 'awilix'

export const models = listModules('./mongoose/*.js', { cwd: __dirname })
  .map(module => require(module.path).default)
