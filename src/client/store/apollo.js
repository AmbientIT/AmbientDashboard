import ApolloClient, { createNetworkInterface } from 'apollo-client'

export default new ApolloClient({
  initialState: typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.APPOLO_STATE
    : {},
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    transportBatching: true,
  }),
})
