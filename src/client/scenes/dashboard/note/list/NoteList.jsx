import React, { Component, PropTypes } from 'react'
import { graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { NoteTable } from '../_components'
import { FETCH_NOTES, FETCH_NOTE, DELETE_NOTE, deleteNoteMutation } from '../_graphql'

const { shape, arrayOf, func, bool, object } = PropTypes

@connect(
  state => state.auth ? { loggedUser: state.auth.loggedUser } || {} : {},
)
@graphql(FETCH_NOTES)
@graphql(DELETE_NOTE, {
  props: deleteNoteMutation,
})
@withApollo
export default class NoteList extends Component {
  goToEditView = id => {
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

  render() {
    const { data, deleteNote } = this.props
    console.log('loading?', data)
    return (
      <section>
        {(() => {
          return data.loading
            ? 'loading.....'
            : <NoteTable
              notes={data.viewer.notes.edges}
              onPrefetch={this.prefetch}
              onEdit={this.goToEditView}
              onDelete={deleteNote}
            />
        })()}
      </section>
    )
  }

  static propTypes = { // eslint-disable-line
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

  static contextTypes = {
    router: shape({
      push: func,
    }),
  }
}