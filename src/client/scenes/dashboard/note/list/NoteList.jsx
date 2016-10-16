import React, { Component, PropTypes } from 'react'
import { graphql, withApollo } from 'react-apollo'
import { NoteTable } from '../_components'
import { FETCH_NOTES, FETCH_NOTE, DELETE_NOTE, deleteNoteMutation, updateAfterFetchMore } from '../_graphql'


@graphql(FETCH_NOTES)
@graphql(DELETE_NOTE, {
  props: data => ({
    deleteNote: deleteNoteMutation(data),
  }),
})
@withApollo
export default class NoteList extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func,
    }),
  }

  goToEditView = id => {
    this.context.router.push(`/note/edit/${id}`)
  }

  prefetch = id => {
    this.props.client.query({
      query: FETCH_NOTE,
      variables: { id },
    })
  }

  fetchMore = cursor => {
    this.props.data.fetchMore({
      query: FETCH_NOTES,
      variables: { cursor },
      updateQuery: updateAfterFetchMore,
    })
  }

  render() {
    return (
      <NoteTable
        title="Notes de Frais"
        apolloData={this.props.data}
        fetchMore={this.fetchMore}
        onPrefetch={this.prefetch}
        onEdit={this.goToEditView}
        onDelete={this.props.deleteNote}
      />
    )
  }
}

NoteList.propTypes = {
  deleteNote: PropTypes.func,
  client: PropTypes.shape({
    query: PropTypes.func,
  }),
  data: PropTypes.shape({
    fetchMore: PropTypes.func,
  }),
}
