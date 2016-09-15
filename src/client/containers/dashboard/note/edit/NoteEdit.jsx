import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { uploadFile } from 'services/uploader' //eslint-disable-line
import FilePreview from 'components/FilePreview' //eslint-disable-line
import NoteDropzone from '../_components/NoteDropzone'
import NoteForm from '../_components/NoteForm'
import { FETCH_NOTE, UPDATE_NOTE } from '../_graphql'
import { updateNote } from '../_utils/notes.actions'

const {
  shape,
  arrayOf,
  string,
  number,
  func,
  date,
  bool,
} = PropTypes

@connect(
  ({ notes: { selectedNote } }) => ({
    note: selectedNote,
  }),
  (dispatch) => ({
    updateNote(note) {
      dispatch(updateNote(note))
    },
  })
)
@graphql(FETCH_NOTE, {
  options: ({ routeParams: { id } }) => ({ variables: { id } }),
})
@graphql(UPDATE_NOTE, {
  props: ({ mutate, ownProps }) => ({
    submitForm: async note => {
      const {
        data: {
          updateNote: {
            changedNote,
          },
        },
      } = await mutate({ variables: note })
      ownProps.updateNote(changedNote)
    },
  }),
})
export default class NoteEdit extends Component {
  static propTypes = {
    note: shape({
      id: string,
      name: string,
      date,
      attachements: shape({
        count: number,
        edges: arrayOf(shape({
          id: string,
          name: string,
          url: string,
          type: string,
        })),
      }),
    }),
    data: shape({
      loading: bool,
    }),
    submitForm: func,
  }

  uploadHandler = async (file) => {
    try {
      const uploadedFile = await uploadFile({
        file,
        url: '/upload/attachement',
        onProgress(progress) {
          console.log(progress)
        },
      })
      console.log(uploadedFile)
    } catch (err) {
      console.error(err)
    }
  }

  removeAttachementHandler = ({ id }) => {
    console.log('remove attachements', id)
  }

  renderLoader() {
    return <div>loading...</div>
  }

  renderForm() {
    const { note } = this.props
    note.date = new Date(note.date)
    return (
      <section>
        <NoteForm note={note} submitForm={this.props.submitForm} />
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

  render() {
    return (
      <div>
        {this.props.data.loading ? this.renderLoader() : this.renderForm()}
      </div>
    )
  }
}
