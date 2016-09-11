import Relay from 'react-relay'
import { viewerCrudFragment } from './lib/utils'

export default class AddNoteMutation extends Relay.Mutation {
  static fragments = viewerCrudFragment

  getMutation() {
    return Relay.QL`mutation{addNote}`
  }

  getVariables() {
    const { name, date } = this.props
    return { name, date }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on addNotePayload {
        changedNoteEdge
        viewer {
          notes {
            count
          }
        }
      }
    `
  }

  getConfigs() {
    console.log(this.props)
    return [{
      type: 'RANGE_ADD',
      parentID: this.props.viewer.id,
      connectionName: 'notes',
      edgeName: 'changedNoteEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }]
  }

  getOptimisticResponse() {
    const { name, date, viewer } = this.props
    return {
      changedNoteEdge: {
        node: {
          name,
          date,
        },
      },
      viewer: {
        id: viewer.id,
        notes: {
          count: viewer.notes.count + 1,
        },
      },
    }
  }
}
