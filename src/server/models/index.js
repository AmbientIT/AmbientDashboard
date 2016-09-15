import { listModules } from 'awilix'
import { getSchema } from '@risingstack/graffiti-mongoose'

export const models = listModules('./mongoose/*.js', { cwd: __dirname })
  .map(module => require(module.path).default)

export const schema = getSchema(models)
