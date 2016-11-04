import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { SmartTable, NoteToolbar } from '../../../../components'
import { note as noteActions } from '../../../../store/actions'
import { formatNoteListWithAuthor } from '../../../../store/reducers/selectors/note'
import getHeaders from './lib/header'
import getAtionButtons from './lib/actionButtons'
import { NOTE_PER_PAGE, mUiTableProps } from './lib/config' //eslint-disable-line

@injectIntl
@connect(
  () => ({}),
  dispatch => bindActionCreators({
    handleUpdate: noteActions.actions.noteUpdate,
    handlePrefetch: noteActions.actions.noteFetchOne,
    handleRemove: noteActions.actions.noteDelete,
    fetchNotes: noteActions.actions.noteFetch,
  }, dispatch)
)
@connect(
  (state, ownProps) => ({
    ...state.note,
    data: formatNoteListWithAuthor(state, ownProps),
  })
  // ({ note, user }, { handleRemove, handlePrefetch }) => {
  //   return {
  //     ...note,
  //     data: Object.keys(note.data).map(key => ({
  //       ...note.data[key],
  //       owner: user.data[note.data[key].owner],
  //       action: <NoteActionColumn note={note.data[key]} onNoteRemove={handleRemove} onNotePrefetch={handlePrefetch} />,
  //     })),
  //   }
  // },
)
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

  componentDidMount() {
    this.props.fetchNotes()
  }

  handleFetchMore = () => {
    // this.props.fetchMoreNotes({
    //   query: GET_NOTES,
    //   variables: {
    //     first: NOTE_PER_PAGE,
    //     cursor: this.props.data[this.props.data.length - 1].cursor,
    //     name: this.state.filterName,
    //     orderBy: this.state.filterColumn.orderBy,
    //   },
    //   updateQuery: fetchMoreNotesUpdateQuery,
    // })
  }

  handleFilterName = async filterName => {
    console.log(filterName)
    // if (filterName.length === 0) {
    //   this.props.refetchNotes()
    // } else {
    //   this.props.fetchMoreNotes({
    //     query: GET_NOTES,
    //     variables: {
    //       first: this.props.data.length,
    //       name: this.state.filterName,
    //       cursor: null,
    //       orderBy: this.state.filterColumn.orderBy,
    //     },
    //     updateQuery: filterUpdateQuery,
    //   })
    // }
  }

  handleSortByColumn = async columnName => {
    console.log(columnName)
    // const { filterColumn } = this.state
    // await this.setState({
    //   filterColumn: {
    //     isDesc: filterColumn.name === columnName ? !filterColumn.isDesc : true,
    //     name: columnName,
    //     orderBy: `${filterColumn.name.toUpperCase()}_${filterColumn.isDesc ? 'DESC' : 'ASC'}`,
    //   },
    // })
    // this.props.fetchMoreNotes({
    //   query: GET_NOTES,
    //   variables: {
    //     first: this.props.data.length,
    //     name: this.state.filterName,
    //     cursor: null,
    //     orderBy: this.state.filterColumn.orderBy,
    //   },
    //   updateQuery: filterUpdateQuery,
    // })
  }

  handleRemoveSelected = async noteIds => {
    const { handleRemove } = this.props
    try {
      await Promise.all(noteIds.map(id => handleRemove({ _id: id })))
    } catch (err) {
      console.error('error remove notes ', err)
    }
  }

  handlePaySelected = async noteIds => {
    console.log(noteIds)
    // const { data, handleUpdate } = this.props
    // try {
    //   await Promise.all(
    //     noteIds
    //       .map(id => {
    //         console.log(Object.assign(data.find(note => note.id === id), { ispay: true }))
    //         return Object.assign(data.find(note => note.id === id), { ispay: true })
    //       })
    //       .map(note => handleUpdate(note))
    //   )
    // } catch (err) {
    //   console.error('error pay notes ', err)
    // }
  }

  render() {
    const { data, count, isLoading, intl } = this.props
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
          isLoading={isLoading}
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
  // handleUpdate: PropTypes.func,
  // noteFetchOne: PropTypes.func,
  fetchNotes: PropTypes.func,
  handleRemove: PropTypes.func,
  intl: PropTypes.shape(),
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape()),
  // fetchMoreNotes: PropTypes.func,
  // refetchNotes: PropTypes.func,
  count: PropTypes.number,
}
