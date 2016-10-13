import React, { Component, PropTypes } from 'react'
import radium from 'radium'
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

@radium()
export class NoteTable extends Component {

  render() {
    const { notes, onEdit, onPrefetch, onDelete } = this.props
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
        {notes.map(({ node }, index) => (
          <TableRow key={index} selected={node.selected}>
            <TableRowColumn>{node.owner.email}</TableRowColumn>
            <TableRowColumn>{node.name}</TableRowColumn>
            <TableRowColumn>{node.date}</TableRowColumn>
            <TableRowColumn>
              <FlatButton
                onTouchTap={() => onEdit(node.id)}
                onMouseOver={() => onPrefetch(node.id)}
                icon={<ActionAndroid />}
                style={{ margin: 12 }}
              />
            </TableRowColumn>
            <TableRowColumn>
              <FlatButton
                onTouchTap={() => onDelete(node.id)}
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

const { shape, arrayOf, string, number, func, date } = PropTypes

NoteTable.propTypes = {
  notes: arrayOf(shape({
    id: string,
    name: string,
    date,
    owner: shape({
      email: string,
      avatar: string,
    }),
    attachements: shape({
      count: number,
    }),
  })),
  onDelete: func,
  onEdit: func,
  onPrefetch: func,
}
