import convert from 'koa-convert'
import graffiti from '@risingstack/graffiti'
import { getSchema } from '@risingstack/graffiti-mongoose'
import { env } from '../_core'
import { models } from '../models'

export const schema = getSchema(models)

export const graphqlMiddleware = () => convert(graffiti.koa({ schema, graphiql: env.DEV }))
