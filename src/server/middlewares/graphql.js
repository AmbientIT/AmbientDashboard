import convert from 'koa-convert'
import graffiti from '@risingstack/graffiti'
import { env } from '../_core'
import { schema } from '../models'

export const graphqlMiddleware = () => convert(graffiti.koa({ schema, graphiql: env.DEV }))
