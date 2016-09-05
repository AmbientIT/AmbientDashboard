import graphqlHTTP from 'koa-graphql'
import convert from 'koa-convert'
import { schema } from './lib/graphql'
import { env } from '../../_core'

export default (router) => {
  router.all('/graphql', convert(graphqlHTTP({
    schema,
    graphiql: env.DEV,
  })))
}
