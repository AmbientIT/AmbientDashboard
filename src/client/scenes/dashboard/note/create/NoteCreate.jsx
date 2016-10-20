import React, { Component, PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { NoteForm } from '../../../../components'
import { CREATE_NOTE, createNoteMutation } from '../../../../apollo'

@injectIntl
@connect(
  state => state.auth ? { loggedUser: state.auth.loggedUser } : {},
)
@graphql(CREATE_NOTE, {
  props: data => ({
    createNoteHandler: createNoteMutation(data),
  }),
})
export default class NoteCreate extends Component {
  render() {
    const initialValues = {
      amount: 0,
      date: new Date(Date.now()),
    }
    return (
      <NoteForm
        onSubmit={this.props.createNoteHandler}
        initialValues={initialValues}
        locale={this.props.intl.locale}
      />
    )
  }
}

NoteCreate.propTypes = {
  createNoteHandler: PropTypes.func,
  intl: PropTypes.shape({
    locale: PropTypes.string,
  }),
}
