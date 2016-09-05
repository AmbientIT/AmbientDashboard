import convert from 'koa-convert'
import graffiti from '@risingstack/graffiti'
import { getSchema } from '@risingstack/graffiti-mongoose'
import { listModules } from 'awilix'
import { env } from '../_core'

const mongooseModels = listModules('../../**/*.model.js', { cwd: __dirname })
  .map(module => require(module.path).default)

export const schema = getSchema(mongooseModels)

export const graphqlMiddleware = () => convert(graffiti.koa({ schema, graphiql: env.DEV }))
