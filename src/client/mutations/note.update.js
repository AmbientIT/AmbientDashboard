import Relay from 'react-relay'

export default class UpdateNoteMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updateNote}`
  }

  getVariables() {
    return {
      id: this.props.id,
      name: this.props.name,
      date: this.props.date,
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on updateNotePayload {
        changedNote {
          name
          date
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        changedNote: this.props.id,
      },
    }]
  }

  getOptimisticResponse() {
    return {
      changedNote: {
        id: this.props.id,
        name: this.props.name,
        date: this.props.date,
      },
    }
  }
}
