import Relay from 'react-relay'

export const viewerQuery = {
  viewer: () => Relay.QL`query{viewer}`,
}
