import Relay from 'react-relay'
import { viewerCrudFragment } from './lib/utils'

export default class DeleteAttachementMutation extends Relay.Mutation {
  static fragments = viewerCrudFragment

  getMutation() {
    return Relay.QL`mutation{deleteAttachement}`
  }

  getVariables() {
    return {
      id: this.props.id,
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on deleteAttachementPayload {
        id
        viewer {
          id
          attachements {
            count
          }
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'attachements',
      deletedIDFieldName: 'id',
    }]
  }

  getOptimisticResponse() {
    const { id, viewer } = this.props
    return {
      id,
      viewer: {
        id: viewer.id,
        attachements: {
          count: viewer.attachements.count - 1,
        },
      },
    }
  }
}
