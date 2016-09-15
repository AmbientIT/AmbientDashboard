import React, { Component, PropTypes } from 'react'
import { graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { FETCH_NOTES, FETCH_NOTE, DELETE_NOTE } from '../_graphql'
import { removeNote } from '../_utils/notes.actions'

const { shape, arrayOf, string, number, func, bool } = PropTypes

@connect(
  ({ notes: { list } }) => ({ list }),
  (dispatch) => ({
    onRemoveNote(id) {
      dispatch(removeNote(id))
    },
  })
)
@graphql(FETCH_NOTES)
@graphql(DELETE_NOTE, {
  props: ({ mutate, ownProps }) => ({
    deleteNote: id => mutate({ variables: { id } }).then(() => ownProps.onRemoveNote(id)),
  }),
})
class NoteList extends Component {
  static propTypes = {
    deleteNote: func,
    list: arrayOf(shape({
      id: string,
      name: string,
      attachements: shape({
        count: number,
      }),
    })),
    client: shape({
      query: func,
    }),
    data: shape({
      loading: bool,
    }),
  }

  static contextTypes = {
    router: shape({
      push: func,
    }),
  }

  goToDetailView = id => {
    this.context.router.push(`/note/edit/${id}`)
  }

  prefetch = id => {
    this.props.client.query({
      query: FETCH_NOTE,
      variables: { id },
    })
  }

  renderData() {
    const { list } = this.props
    return list.map((note, index) => (
      <TableRow key={index} selected={note.selected}>
        <TableRowColumn>{note.id}</TableRowColumn>
        {/* <TableRowColumn>{note.owner.name}</TableRowColumn> */}
        <TableRowColumn>{note.name}</TableRowColumn>
        <TableRowColumn>{new Intl.DateTimeFormat().format(new Date(note.date))}</TableRowColumn>
        <TableRowColumn>
          <FlatButton
            onTouchTap={() => this.goToDetailView(note.id)}
            onMouseOver={() => this.prefetch(note.id)}
            icon={<ActionAndroid />}
            style={{ margin: 12 }}
          />
        </TableRowColumn>
        <TableRowColumn>
          <FlatButton
            onTouchTap={() => this.props.deleteNote(note.id)}
            icon={<ActionAndroid />}
            style={{ margin: 12 }}
          />
        </TableRowColumn>
      </TableRow>
      ))
  }

  renderLoader() {
    return 'loading...'
  }

  render() {
    const { data } = this.props
    return (
      <Table
        height="500px"
        fixedHeader
        fixedFooter
        selectable
        multiSelectable
      >
        <TableHeader
          displaySelectAll
          adjustForCheckbox
          enableSelectAll
        >
          <TableRow>
            <TableHeaderColumn
              colSpan="6"
              style={{ textAlign: 'center' }}
            >
              Notes de frais
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
            <TableHeaderColumn tooltip="Owner">Owner</TableHeaderColumn>
            <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
            <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
            <TableHeaderColumn tooltip="Editer">Edit</TableHeaderColumn>
            <TableHeaderColumn tooltip="Supprimer">Supprimer</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox
          deselectOnClickaway
          showRowHover
          stripedRows
        >
          {data.loading ? this.renderLoader() : this.renderData()}
        </TableBody>
      </Table>
    )
  }
}

export default withApollo(NoteList)
