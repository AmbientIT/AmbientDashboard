import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { NoteForm } from '../../../../components'
import { CREATE_NOTE, createNoteMutation } from '../../../../apollo'

@connect(
  state => state.auth ? { loggedUser: state.auth.loggedUser } : {},
)
@graphql(CREATE_NOTE, {
  props: data => ({
    createNote: createNoteMutation(data),
  }),
})
export default class NoteCreate extends Component {
  render() {
    const initialValues = {
      amount: 0,
      date: new Date(Date.now()),
    }
    return <NoteForm onSubmit={this.props.createNote} initialValues={initialValues} />
  }
}

NoteCreate.propTypes = {
  createNote: PropTypes.func,
}
