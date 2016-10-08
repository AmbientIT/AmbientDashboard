import ApolloClient, { createNetworkInterface } from 'apollo-client'

export default new ApolloClient({
  initialState: typeof window === 'object'
    ? window.APOLLO_STATE
    : {},
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    transportBatching: true,
  }),
})
