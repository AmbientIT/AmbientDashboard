import { apolloKoa, graphiqlKoa } from 'apollo-server'
import { getSchema } from '../../models'
import { env } from '../../_core'
import isAuthenticated from '../../middlewares/guards/isAuthenticated'

const graphqlMiddlewares = env.DEV ? [] : [isAuthenticated]

export default async router => {
  router.post('/graphql', ...graphqlMiddlewares, apolloKoa({ schema: await getSchema() }))
  if (env.DEV) {
    router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
  }
}
