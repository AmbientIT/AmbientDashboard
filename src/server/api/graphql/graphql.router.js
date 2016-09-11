// import { getSchema } from '@risingstack/graffiti-mongoose'
import { apolloKoa, graphiqlKoa } from 'apollo-server'
// import { schema } from '../../models'

export default (router) => {
  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
  // const schema = getSchema(models)
  // router.post('/graphql', apolloKoa({ schema }))
}
