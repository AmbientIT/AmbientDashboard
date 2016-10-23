import ApolloClient, { createNetworkInterface } from 'apollo-client'

export * from './note/mutations'
export * from './note/queries'
export * from './note/reducers/queries'
export * from './note/reducers/updateQueries'

export default new ApolloClient({
  dataIdFromObject: o => o.id,
  initialState: typeof window === 'object'
    ? window.APOLLO_STATE
    : {},
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    transportBatching: true,
  }),
})
