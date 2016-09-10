import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import NoteForm from '../_components/NoteForm'
import AddNoteMutation from '../_mutations/note.add'

class NoteCreate extends Component {
  static propTypes = {
    viewer: PropTypes.object,
  }
  submitForm = ({ name, date }) => {
    const { viewer } = this.props
    Relay.Store.commitUpdate(
      new AddNoteMutation({ name, date, viewer })
    )
  }
  render() {
    return (
      <NoteForm submitForm={this.submitForm} />
    )
  }
}

export default Relay.createContainer(NoteCreate, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      id
      notes {
        count
      }
    }`,
  },
})
