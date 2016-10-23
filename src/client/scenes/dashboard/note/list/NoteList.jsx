import React, { Component, PropTypes } from 'react'
import { injectIntl } from 'react-intl'
import { graphql, withApollo } from 'react-apollo'
import { SmartTable, NoteToolbar } from '../../../../components'
import {
  GET_NOTES,
  DELETE_NOTE,
  UPDATE_NOTE,
  deleteNoteMutation,
  updateNoteMutation,
  fetchMoreNotesUpdateQuery,
  getNotesReducer,
  filterUpdateQuery,
} from '../../../../apollo'
import getHeaders from './lib/header'
import getAtionButtons from './lib/actionButtons'
import { NOTE_PER_PAGE, mUiTableProps } from './lib/config'

@injectIntl
@withApollo
@graphql(UPDATE_NOTE, {
  props: data => ({
    handleUpdate: updateNoteMutation(data),
  }),
})
@graphql(DELETE_NOTE, {
  props: data => ({
    handleRemove: deleteNoteMutation(data),
  }),
})
@graphql(GET_NOTES, {
  options: {
    variables: {
      first: NOTE_PER_PAGE,
      orderBy: 'DATE_DESC',
      cursor: null,
      name: null,
    },
  },
  props: getNotesReducer,
})
export default class NoteList extends Component {
  state = {
    filterName: null,
    filterColumn: {
      isDesc: true,
      name: 'date',
      orderBy: 'DATE_DESC',
    },
    ...mUiTableProps,
  }

  handleFetchMore = () => {
    this.props.fetchMoreNotes({
      query: GET_NOTES,
      variables: {
        first: NOTE_PER_PAGE,
        cursor: this.props.data[this.props.data.length - 1].cursor,
        name: this.state.filterName,
        orderBy: this.state.filterColumn.orderBy,
      },
      updateQuery: fetchMoreNotesUpdateQuery,
    })
  }

  handleFilterName = async filterName => {
    if (filterName.length === 0) {
      this.props.refetchNotes()
    } else {
      this.props.fetchMoreNotes({
        query: GET_NOTES,
        variables: {
          first: this.props.data.length,
          name: this.state.filterName,
          cursor: null,
          orderBy: this.state.filterColumn.orderBy,
        },
        updateQuery: filterUpdateQuery,
      })
    }
  }

  handleSortByColumn = async columnName => {
    const { filterColumn } = this.state
    await this.setState({
      filterColumn: {
        isDesc: filterColumn.name === columnName ? !filterColumn.isDesc : true,
        name: columnName,
        orderBy: `${filterColumn.name.toUpperCase()}_${filterColumn.isDesc ? 'DESC' : 'ASC'}`,
      },
    })
    this.props.fetchMoreNotes({
      query: GET_NOTES,
      variables: {
        first: this.props.data.length,
        name: this.state.filterName,
        cursor: null,
        orderBy: this.state.filterColumn.orderBy,
      },
      updateQuery: filterUpdateQuery,
    })
  }

  handleRemoveSelected = async noteIds => {
    const { handleRemove } = this.props
    try {
      await Promise.all(noteIds.map(id => handleRemove(id)))
    } catch (err) {
      console.error('error remove notes ', err)
    }
  }

  handlePaySelected = async noteIds => {
    const { data, handleUpdate } = this.props
    try {
      await Promise.all(
        noteIds
          .map(id => {
            console.log(Object.assign(data.find(note => note.id === id), { ispay: true }))
            return Object.assign(data.find(note => note.id === id), { ispay: true })
          })
          .map(note => handleUpdate(note))
      )
    } catch (err) {
      console.error('error pay notes ', err)
    }
  }

  render() {
    const { data, count, loading, intl } = this.props
    const { handleRemoveSelected, handlePaySelected } = this
    return (
      <section>
        <NoteToolbar
          onFilterName={this.handleFilterName}
        />
        <SmartTable
          count={count}
          headers={getHeaders(intl.locale)}
          data={data}
          isLoading={loading}
          tableProps={this.state.tableProps}
          headerProps={this.state.headerProps}
          bodyProps={this.state.bodyProps}
          onFetchMore={this.handleFetchMore}
          onSortByColumn={this.handleSortByColumn}
          actionButtons={getAtionButtons({ handleRemoveSelected, handlePaySelected })}
        />
      </section>
    )
  }
}

NoteList.propTypes = {
  handleUpdate: PropTypes.func,
  handleRemove: PropTypes.func,
  intl: PropTypes.shape(),
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape()),
  fetchMoreNotes: PropTypes.func,
  refetchNotes: PropTypes.func,
  count: PropTypes.number,
}
