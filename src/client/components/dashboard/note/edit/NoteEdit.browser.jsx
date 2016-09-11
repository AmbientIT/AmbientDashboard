import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import NoteDropzone from '../_components/NoteDropzone'
import NoteForm from '../_components/NoteForm'
import UpdateNoteMutation from '../_mutations/note.update'
import AddAttachementMutation from '../_mutations/attachement.add'
import DeleteAttachementMutation from '../_mutations/attachement.delete'
import { uploadFile } from '../../../../services/uploader'
import FilePreview from '../_components/FilePreview'

class TodoEdit extends Component {
  static propTypes = {
    viewer: PropTypes.object,
    note: PropTypes.object,
  }

  uploadHandler = async (file) => {
    try {
      const { name, url, type } = await uploadFile({
        file,
        url: '/upload/attachement',
        onProgress(progress) {
          console.log(progress)
        },
      })
      const { note, viewer } = this.props
      Relay.Store.commitUpdate(
        new AddAttachementMutation({ name, url, type, note, viewer })
      )
    } catch (err) {
      console.error(err)
    }
  }

  removeAttachementHandler = ({ id }) => {
    const { viewer } = this.props
    Relay.Store.commitUpdate(
      new DeleteAttachementMutation({ id, viewer })
    )
  }

  submitForm = ({ name, date }) => {
    const { note: { id } } = this.props
    Relay.Store.commitUpdate(
      new UpdateNoteMutation({ name, date: date.toString(), id })
    )
  }

  render() {
    const { note } = this.props
    note.date = new Date(note.date)
    return (
      <section>
        <NoteForm note={note} submitForm={this.submitForm} />
        <div className="filepreview-container">
          {note.attachements.edges.map(({ node }, index) => (
            <FilePreview
              file={node}
              key={index}
              removeFile={this.removeAttachementHandler}
            />
          ))}
        </div>
        <NoteDropzone onUpload={this.uploadHandler} />
      </section>
    )
  }
}

export const noteQuery = {
  note: () => Relay.QL`query {
    note(id: $id)
  }`,
  viewer: () => Relay.QL`query{viewer}`,
}

export default Relay.createContainer(TodoEdit, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      id
      notes {
        count
      }
    }`,
    note: () => Relay.QL`fragment on Note{
      id
      name
      description
      date
      attachements(first:10){
        count
        edges{
          node{
            id
            name
            url
            type
          }
        }
      }
    }`,
  },
})
