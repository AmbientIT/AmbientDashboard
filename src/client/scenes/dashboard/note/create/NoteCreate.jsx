import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { NoteForm } from '../_components'
import { CREATE_NOTE, createNoteMutation } from '../_graphql'

@connect(
  state => state.auth ? { loggedUser: state.auth.loggedUser } : {},
)
@graphql(CREATE_NOTE, {
  props: data => ({
    createNote: createNoteMutation(data),
  }),
})
export default class NoteCreate extends Component { //eslint-disable-line
  render() {
    return <NoteForm submitForm={this.props.createNote} />
  }
}

NoteCreate.propTypes = {
  createNote: PropTypes.func,
}
