import Relay from 'react-relay'

export default class AddAttachementMutation extends Relay.Mutation {
  static fragments = {
    note: () => Relay.QL`fragment on Note {
      id
      attachements {
        count
      }
    }`,
  }

  getMutation() {
    return Relay.QL`mutation{addAttachement}`
  }

  getVariables() {
    const { name, url, type, note } = this.props
    return { name, url, type, note: note.id }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on addAttachementPayload {
        changedAttachementEdge
        viewer {
          attachements {
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
      connectionName: 'attachements',
      edgeName: 'changedAttachementEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }]
  }

  getOptimisticResponse() {
    const { name, url, type, note } = this.props
    return {
      changedAttachementEdge: {
        node: {
          name,
          url,
          type,
          note: note.id,
        },
      },
      note: {
        id: note.id,
        attachements: {
          count: note.attachements.count || 0 + 1,
        },
      },
    }
  }
}
