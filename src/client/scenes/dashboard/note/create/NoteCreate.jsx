import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { NoteForm } from '../../../../components'
import { note as noteActions } from '../../../../store/actions'
import { amountToFloat } from '../../../../lib/currency'

const { noteCreate } = noteActions.actions

@injectIntl
@connect(
  ({ user, auth }) => ({
    loggedUser: user.data[auth.loggedUser],
    initialValues: {
      amount: 0,
      date: new Date(Date.now()),
    },
  }),
  dispatch => bindActionCreators({
    dispatchNoteCreate: noteCreate,
  }, dispatch)
)
export default class NoteCreate extends Component {

  handleSubmitForm = (note) => {
    const { loggedUser, dispatchNoteCreate } = this.props
    dispatchNoteCreate({
      method: 'post',
      body: {
        ...note,
        amount: amountToFloat(note.amount),
        owner: loggedUser._id,
      },
    })
  }

  render() {
    const { intl, initialValues } = this.props
    return (
      <NoteForm
        onSubmit={this.handleSubmitForm}
        initialValues={initialValues}
        locale={intl.locale}
      />
    )
  }
}

NoteCreate.propTypes = {
  loggedUser: PropTypes.shape(),
  dispatchNoteCreate: PropTypes.func,
  intl: PropTypes.shape(),
  initialValues: PropTypes.shape(),
}
