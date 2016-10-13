import React, { Component, PropTypes } from 'react'
import { graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { FETCH_NOTES, FETCH_NOTE, DELETE_NOTE, deleteNoteMutation } from '../_graphql'
// import { NoteTable } from '../_components'

@connect(
  state => state.auth ? { loggedUser: state.auth.loggedUser } || {} : {},
)
@graphql(FETCH_NOTES)
@graphql(DELETE_NOTE, {
  props: deleteNoteMutation,
})
class NoteList extends Component {
  goToDetailView = id => {
    this.context.router.push(`/note/edit/${id}`)
  }

  prefetch = id => {
    this.props.client.query({
      query: FETCH_NOTE,
      variables: { id },
    })
  }

  formatDate = inputDate => {
    return new Intl.DateTimeFormat('en-US').format(new Date(inputDate))
  }

  renderData() {
    // const { data: { viewer: { notes: { edges } } } } = this.props
    return (
      <div>
        dsdqds
      </div>
    )
  }

  renderLoader() {
    return 'loading...'
  }

  render() {
    // const { data } = this.props
    return (
      <div>dsdqsd</div>
    )
  }
}

const { shape, arrayOf, func, bool, object } = PropTypes

NoteList.propTypes = {
  deleteNote: func,
  loggedUser: object,
  client: shape({
    query: func,
  }),
  data: shape({
    loading: bool,
    viewer: shape({
      notes: shape({
        edges: arrayOf(object),
      }),
    }),
  }),
}

NoteList.contextTypes = {
  router: shape({
    push: func,
  }),
}

export default withApollo(NoteList)
