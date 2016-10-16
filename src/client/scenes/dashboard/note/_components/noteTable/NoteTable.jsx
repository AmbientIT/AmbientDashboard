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
import style from './noteTable.style'


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
              colSpan="5"
              style={style.header}
            >
              Notes de frais
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Owner</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Edit</TableHeaderColumn>
            <TableHeaderColumn>Supprimer</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox
          deselectOnClickaway
          showRowHover
          stripedRows
        >
          {notes.map((note, index) => (
            <TableRow key={index} selected={note.selected}>
              <TableRowColumn>{note.owner.email}</TableRowColumn>
              <TableRowColumn>{note.name}</TableRowColumn>
              <TableRowColumn>{note.displayDate}</TableRowColumn>
              <TableRowColumn>
                <FlatButton
                  onTouchTap={() => onEdit(note.id)}
                  onMouseOver={() => onPrefetch(note.id)}
                  icon={<ActionAndroid />}
                  style={{ margin: 12 }}
                />
              </TableRowColumn>
              <TableRowColumn>
                <FlatButton
                  onTouchTap={() => onDelete(note.id)}
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

const { shape, arrayOf, string, number, func } = PropTypes

NoteTable.propTypes = {
  notes: arrayOf(shape({
    id: string,
    name: string,
    date: PropTypes.date,
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
