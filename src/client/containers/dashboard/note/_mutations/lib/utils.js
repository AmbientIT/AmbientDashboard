import Relay from 'react-relay'

export const viewerCrudFragment = {
  viewer: () => Relay.QL`fragment on Viewer {
    id
    notes {
      count
    }
  }`,
}
