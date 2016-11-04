import React, { Component, PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MDSpinner from 'react-md-spinner'
import { uploadAttachement } from '../../../../store/actions/attachement'
import { NoteForm, Attachements, MyDropzone } from '../../../../components'
import { note as noteActions } from '../../../../store/actions'

const { noteFetchOne, noteUpdate } = noteActions.actions

@injectIntl
@connect(
  (state, ownProps) => ({
    loggedUser: state.auth ? state.auth.loggedUser : {},
    note: {
      ...state.note.data[ownProps.params.id],
      date: new Date(state.note.data[ownProps.params.id].date),
    },
    isLoading: state.note.isLoading,
  }),
  dispatch => bindActionCreators({
    uploadHandler: uploadAttachement,
    fetchNote: noteFetchOne,
    dispatchNoteUpdate: noteUpdate,
  }, dispatch)
)
export default class NoteEdit extends Component {
  state = {
    dropzoneLabel: 'drop some file here',
  }

  componentDidMount() {
    const { id } = this.props.params
    this.props.fetchNote({
      url: `/note/${id}`,
    })
  }


  handleUpdateNote = note => {
    this.props.dispatchNoteUpdate({
      method: 'put',
      id: note._id,
      body: note,
    })
  }

  removeAttachementHandler = ({ id }) => {
    console.log('remove attachements', id)
  }

  renderForm() {
    return (
      <section>
        <NoteForm
          initialValues={this.props.note}
          onSubmit={this.handleUpdateNote}
          locale={this.props.intl.locale}
        />
        <Attachements
          count={this.props.note.attachements.count}
          attachements={this.props.note.attachements}
          onRemoveAttachement={this.removeAttachementHandler}
        />
        <MyDropzone
          label={this.state.dropzoneLabel}
          onUpload={this.props.uploadHandler}
        />
      </section>
    )
  }

  render() {
    return this.props.isLoading ? <MDSpinner /> : this.renderForm()
  }
}

NoteEdit.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  fetchNote: PropTypes.func,
  note: PropTypes.shape({
    attachements: PropTypes.arrayOf(),
  }),
  isLoading: PropTypes.bool,
  intl: PropTypes.shape({
    locale: PropTypes.string,
  }),
  dispatchNoteUpdate: PropTypes.func,
  uploadHandler: PropTypes.func,
}
