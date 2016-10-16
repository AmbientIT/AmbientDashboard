import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { uploadAttachement } from '../_actions/attachement.actions'
import { NoteForm, Attachements } from '../_components'
import { FETCH_NOTE, UPDATE_NOTE, updateNoteMutation } from '../_graphql'
import { MyDropzone } from '../../../../components'

@connect(
  state => state.auth ? { loggedUser: state.auth.loggedUser } || {} : {},
  dispatch => bindActionCreators({ onUpload: uploadAttachement }, dispatch)
)
@graphql(FETCH_NOTE, {
  options: ({ routeParams: { id } }) => ({ variables: { id } }),
})
@graphql(UPDATE_NOTE,
  {
    props: data => ({
      updateNote: updateNoteMutation(data),
    }),
  }
)
export default class NoteEdit extends Component {
  dropzoneLabel = 'drop some file here'

  removeAttachementHandler = ({ id }) => {
    console.log('remove attachements', id)
  }

  renderLoader = () => {
    return <div>loading...</div>
  }

  renderForm() {
    const { data: { note }, onUpload } = this.props
    note.date = new Date(note.date)
    return (
      <section>
        <NoteForm note={note} submitForm={this.props.updateNote} />
        <Attachements
          attachements={note.attachements.edges}
          onRemoveAttachement={this.removeAttachementHandler}
        />
        <MyDropzone
          label={this.dropzoneLabel}
          onUpload={onUpload}
        />
      </section>
    )
  }

  render() {
    return this.props.data.loading ? this.renderLoader() : this.renderForm()
  }
}

const { shape, arrayOf, string, number, func, date, bool } = PropTypes

NoteEdit.propTypes = {
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
  updateNote: func,
  onUpload: func,
}
