import React, { Component, PropTypes } from 'react'
import { graphql, withApollo } from 'react-apollo'
import MDSpinner from 'react-md-spinner'
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

  removeSelected = async noteIds => {
    try {
      await Promise.all(noteIds.map(id => this.props.deleteNote(id)))
    } catch (err) {
      console.error('error remove notes ', err)
    }
  }

  renderTable() {
    const { count, edges } = this.props.data.viewer.notes
    return (
      <NoteTable
        title="Notes de Frais"
        list={edges}
        count={count}
        fetchMore={this.fetchMore}
        onPrefetch={this.prefetch}
        onEdit={this.goToEditView}
        onDelete={this.props.deleteNote}
        removeSelected={this.removeSelected}
        selectable
      />
    )
  }

  render() {
    return this.props.data.loading
      ? <MDSpinner />
      : this.renderTable()
  }
}

NoteList.propTypes = {
  deleteNote: PropTypes.func,
  client: PropTypes.shape({
    query: PropTypes.func,
  }),
  data: PropTypes.shape({
    fetchMore: PropTypes.func,
    loading: PropTypes.bool,
    viewer: PropTypes.shape({
      notes: PropTypes.shape({
        count: PropTypes.number,
        edges: PropTypes.arrayOf(PropTypes.shape()),
      }),
    }),
  }),
}
