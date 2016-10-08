import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { uploadFile } from '../../../../services/uploader'
import FilePreview from '../../../../components/FilePreview'
import NoteDropzone from '../_components/NoteDropzone'
import NoteForm from '../_components/NoteForm'
import { FETCH_NOTE, UPDATE_NOTE } from '../_graphql'

const {
  shape,
  arrayOf,
  string,
  number,
  func,
  date,
  bool,
} = PropTypes

@graphql(FETCH_NOTE, {
  options: ({ routeParams: { id } }) => ({ variables: { id } }),
})
@graphql(UPDATE_NOTE, {
  props: ({ mutate, ownProps }) => ({
    submitForm: async note => {
      try {
        Object.assign(note, ownProps.params)

        await mutate({
          variables: note,
          updateQueries: {
            getNotes: (prev, { mutationResult }) => {
              if (prev.viewer) {
                const { notes } = prev.viewer

                notes.edges = notes.edges.map(({ node }) => {
                  const mappedNode = mutationResult.data.updateNote.changedNote

                  return node.id === mappedNode.id
                    ? {
                      node: mappedNode,
                    }
                    : { node }
                })
              }
              return prev
            },
          },
        })

        ownProps.history.push('/note')
      } catch (err) {
        console.error('update note error', err)
      }
    },
  }),
})
export default class NoteEdit extends Component {
  static propTypes = {
    data: shape({
      loading: bool,
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
    const { data: { note } } = this.props
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
