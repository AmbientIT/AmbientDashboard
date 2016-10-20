import React, { Component, PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { uploadAttachement } from '../../../../store/actions/attachement'
import { NoteForm, Attachements, MyDropzone } from '../../../../components'
import { FETCH_NOTE, UPDATE_NOTE, updateNoteMutation } from '../../../../apollo'

@injectIntl
@connect(
  state => state.auth ? { loggedUser: state.auth.loggedUser } || {} : {},
  dispatch => bindActionCreators({ uploadHandler: uploadAttachement }, dispatch)
)
@graphql(UPDATE_NOTE, {
  props: data => ({
    updateNoteHandler: updateNoteMutation(data),
  }),
})
@graphql(FETCH_NOTE, {
  options: ({ routeParams: { id } }) => ({ variables: { id } }),
})
export default class NoteEdit extends Component {
  dropzoneLabel = 'drop some file here'

  removeAttachementHandler = ({ id }) => {
    console.log('remove attachements', id)
  }

  renderLoader = () => {
    return <div>loading...</div>
  }

  renderForm() {
    return (
      <section>
        <NoteForm
          initialValues={Object.assign(this.props.data.note, { date: new Date(this.props.data.note.date) })}
          onSubmit={this.props.updateNoteHandler}
          locale={this.props.intl.locale}
        />
        <Attachements
          count={this.props.data.note.attachements.count}
          attachements={this.props.data.note.attachements.edges}
          onRemoveAttachement={this.removeAttachementHandler}
        />
        <MyDropzone
          label={this.dropzoneLabel}
          onUpload={this.props.uploadHandler}
        />
      </section>
    )
  }

  render() {
    return this.props.data.loading ? this.renderLoader() : this.renderForm()
  }
}

NoteEdit.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    note: PropTypes.shape({
      date: PropTypes.date,
      attachements: PropTypes.shape({
        count: PropTypes.number,
        edges: PropTypes.arrayOf(PropTypes.shape()),
      }),
    }),
  }),
  intl: PropTypes.shape({
    locale: PropTypes.string,
  }),
  updateNoteHandler: PropTypes.func,
  uploadHandler: PropTypes.func,
}
