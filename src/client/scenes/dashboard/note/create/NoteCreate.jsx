import React, { Component, PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { NoteForm } from '../../../../components'
import { ADD_NOTE, addNoteMutation } from '../../../../apollo'

@injectIntl
@connect(
  state => state.auth ? { loggedUser: state.auth.loggedUser } : {},
)
@graphql(ADD_NOTE, {
  props: data => ({
    createNote: addNoteMutation(data),
  }),
})
export default class NoteCreate extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func,
    }),
  }

  createNoteHandler = async note => {
    try {
      console.log(note)
      const createdNote = await this.props.createNote(note)
      this.context.router.push(`/note/edit/${createdNote.id}`)
    } catch (err) {
      console.error('error create: ', err)
    }
  }

  render() {
    const initialValues = {
      amount: 0,
      date: new Date(Date.now()),
    }
    return (
      <NoteForm
        onSubmit={this.createNoteHandler}
        initialValues={initialValues}
        locale={this.props.intl.locale}
      />
    )
  }
}

NoteCreate.propTypes = {
  createNote: PropTypes.func,
  intl: PropTypes.shape({
    locale: PropTypes.string,
  }),
}
