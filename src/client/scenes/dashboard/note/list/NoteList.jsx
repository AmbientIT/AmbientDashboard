import React, { Component, PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { graphql, withApollo } from 'react-apollo'
import { SmartTable, NoteToolbar } from '../../../../components'
import {
  FETCH_NOTES,
  FETCH_NOTE,
  DELETE_NOTE,
  deleteNoteMutation,
  fetchMoreNotesUpdateQuery,
  fetchNotesReducer,
  filterUpdateQuery,
} from '../../../../apollo'

const NOTE_BY_PAGE = 3

@injectIntl
@graphql(DELETE_NOTE, {
  props: data => ({
    handleRemove: deleteNoteMutation(data),
  }),
})
@graphql(FETCH_NOTES, {
  options: {
    variables: {
      first: NOTE_BY_PAGE,
      orderBy: 'DATE_DESC',
      cursor: null,
      name: null,
      date: null,
    },
  },
  props: fetchNotesReducer,
})
@withApollo
export default class NoteList extends Component {
  state = {
    filterDate: null,
    filterName: null,
    filterColumn: {
      isDesc: true,
      name: 'date',
      orderBy: 'DATE_DESC',
    },
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
      variables: {
        first: NOTE_BY_PAGE,
        cursor,
        name: this.state.filterName,
        date: this.state.filterDate,
        orderBy: this.state.filterColumn.orderBy,
      },
      updateQuery: fetchMoreNotesUpdateQuery,
    })
  }

  handleFilterName = async filterName => {
    await this.setState({ filterName, filterDate: null })
    if (filterName.length === 0) {
      this.props.refetchNotes()
    } else {
      this.props.fetchMoreNotes({
        query: FETCH_NOTES,
        variables: {
          first: this.props.data.length,
          name: this.state.filterName,
          date: this.state.filterDate,
          cursor: null,
          orderBy: this.state.filterColumn.orderBy,
        },
        updateQuery: filterUpdateQuery,
      })
    }
  }

  handleFilterDate = async filterDate => {
    await this.setState({ filterDate, filterName: null })
    this.props.fetchMoreNotes({
      query: FETCH_NOTES,
      variables: {
        first: this.props.data.length,
        date: this.state.filterDate,
        name: this.state.filterName,
        cursor: null,
        orderBy: this.state.filterColumn.orderBy,
      },
      updateQuery: filterUpdateQuery,
    })
  }

  handleSortByColumn = async columnName => {
    const { filterColumn, filterName, filterDate } = this.state
    await this.setState({
      filterColumn: {
        isDesc: filterColumn.name === columnName ? !filterColumn.isDesc : true,
        name: columnName,
        orderBy: `${filterColumn.name.toUpperCase()}_${filterColumn.isDesc ? 'DESC' : 'ASC'}`,
      },
    })
    this.props.fetchMoreNotes({
      query: FETCH_NOTES,
      variables: {
        first: this.props.data.length,
        name: filterName,
        date: filterDate,
        cursor: null,
        orderBy: this.state.filterColumn.orderBy,
      },
      updateQuery: filterUpdateQuery,
    })
  }

  handleRemoveSelected = async noteIds => {
    try {
      await Promise.all(noteIds.map(id => this.props.handleRemove(id)))
    } catch (err) {
      console.error('error remove notes ', err)
    }
  }

  render() {
    const { data, headers, count, loading } = this.props
    return (
      <section>
        <NoteToolbar
          onFilterName={this.handleFilterName}
          onFilterDate={this.handleFilterDate}
        />
        <SmartTable
          count={count}
          headers={headers}
          data={data}
          isLoading={loading}
          tableProps={this.state.tableProps}
          headerProps={this.state.headerProps}
          bodyProps={this.state.bodyProps}
          onFetchMore={this.handleFetchMore}
          sortByColumn={this.handleSortByColumn}
        />
      </section>
    )
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
  refetchNotes: PropTypes.func,
  count: PropTypes.number,
}
