import React, { Component, PropTypes } from 'react'
import { graphql, withApollo } from 'react-apollo'
import MDSpinner from 'react-md-spinner'
import { SmartTable, NoteToolbar } from '../../../../components'
import {
  FETCH_NOTES,
  FETCH_NOTE,
  // FETCH_NOTES_BY_NAME,
  DELETE_NOTE,
  deleteNoteMutation,
  fetchMoreNotesUpdateQuery,
  fetchNotesReducer,
} from '../../../../apollo'

@graphql(DELETE_NOTE, {
  props: data => ({
    handleRemove: deleteNoteMutation(data),
  }),
})
@graphql(FETCH_NOTES, {
  props: fetchNotesReducer,
})
@withApollo
export default class NoteList extends Component {
  state = {
    tableProps: {
      selectable: true,
      multiSelectable: true,
    },
    headerProps: {
      displaySelectAll: true,
      adjustForCheckbox: true,
    },
    bodyProps: {
      showRowHover: true,
      stripedRows: true,
      displayRowCheckbox: true,
    },
  }

  handlePrefetch = id => {
    this.props.client.query({
      query: FETCH_NOTE,
      variables: { id },
    })
  }

  handleFetchMore = cursor => {
    this.props.fetchMoreNotes({
      query: FETCH_NOTES,
      variables: { cursor },
      updateQuery: fetchMoreNotesUpdateQuery,
    })
  }

  handleFilterName = filter => {
    console.log('filter name : ', filter)
  }

  handleRemoveSelected = async noteIds => {
    try {
      await Promise.all(noteIds.map(id => this.props.handleRemove(id)))
    } catch (err) {
      console.error('error remove notes ', err)
    }
  }

  renderTable() {
    const { data, headers, count } = this.props
    return (
      <section>
        <NoteToolbar
          onFilterName={this.handleFilterName}
        />
        <SmartTable
          count={count}
          headers={headers}
          data={data}
          tableProps={this.state.tableProps}
          headerProps={this.state.headerProps}
          bodyProps={this.state.bodyProps}
          onFetchMore={this.handleFetchMore}
        />
      </section>
    )
  }

  render() {
    return this.props.loading ? <MDSpinner /> : this.renderTable()
  }
}

NoteList.propTypes = {
  handleRemove: PropTypes.func,
  client: PropTypes.shape({
    query: PropTypes.func,
  }),
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape()),
  headers: PropTypes.arrayOf(PropTypes.shape()),
  fetchMoreNotes: PropTypes.func,
  count: PropTypes.number,
}
