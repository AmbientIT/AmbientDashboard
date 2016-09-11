import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
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
import DeleteNoteMutation from '../_mutations/note.delete'


class NoteList extends Component {
  static propTypes = {
    viewer: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  goToDetailView = id => {
    this.context.router.push(`/note/edit/${id}`)
  }

  deleteNote(id) {
    const { viewer } = this.props
    Relay.Store.commitUpdate(
      new DeleteNoteMutation({ id, viewer })
    )
  }

  render() {
    const { viewer } = this.props
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
        {viewer.notes.edges.map(({ node }, index) => (
          <TableRow key={index} selected={node.selected}>
            <TableRowColumn>{node.id}</TableRowColumn>
            {/* <TableRowColumn>{note.owner.name}</TableRowColumn> */}
            <TableRowColumn>{node.name}</TableRowColumn>
            <TableRowColumn>{new Intl.DateTimeFormat().format(new Date(node.date))}</TableRowColumn>
            <TableRowColumn>
              <FlatButton
                onTouchTap={() => this.goToDetailView(node.id)}
                icon={<ActionAndroid />}
                style={{ margin: 12 }}
              />
            </TableRowColumn>
            <TableRowColumn>
              <FlatButton
                onTouchTap={() => this.deleteNote(node.id)}
                icon={<ActionAndroid />}
                style={{ margin: 12 }}
              />
            </TableRowColumn>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export default Relay.createContainer(NoteList, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      notes(first:10) {
        count
        edges {
          node {
            id
            name
            date
          }
        }
      }
    }`,
  },
})
