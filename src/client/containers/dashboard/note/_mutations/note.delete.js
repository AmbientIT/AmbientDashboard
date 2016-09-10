import Relay from 'react-relay'
import { viewerCrudFragment } from './lib/utils'

export default class DeleteNoteMutation extends Relay.Mutation {
  static fragments = viewerCrudFragment

  getMutation() {
    return Relay.QL`mutation{deleteNote}`
  }

  getVariables() {
    return {
      id: this.props.id,
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on deleteNotePayload {
        id
        viewer {
          id
          notes {
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
      connectionName: 'notes',
      deletedIDFieldName: 'id',
    }]
  }

  getOptimisticResponse() {
    const { id, viewer } = this.props
    return {
      id,
      viewer: {
        id: viewer.id,
        notes: {
          count: viewer.notes.count - 1,
        },
      },
    }
  }
}
