import React, { PropTypes } from 'react'
import radium from 'radium'
import FlatButton from 'material-ui/FlatButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import { TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { TableWidget } from '../../../../../components/tableWidget/TableWidget'
import style from './noteTable.style'


@radium()
export class NoteTable extends TableWidget {
  static contextTypes = {
    locale: PropTypes.string,
  }

  formatList = list => {
    return list.map(({ node, cursor }) => {
      const displayDate = new Intl.DateTimeFormat(this.context.locale)
        .format(new Date(node.date))
      return Object.assign({ displayDate, cursor }, node)
    })
  }

  renderHeader = () => {
    return (
      <TableRow>
        <TableHeaderColumn style={style.tableCell}>Owner</TableHeaderColumn>
        <TableHeaderColumn style={style.tableCell}>Name</TableHeaderColumn>
        <TableHeaderColumn style={style.tableCell}>Date</TableHeaderColumn>
        <TableHeaderColumn style={style.tableCell}>Edit</TableHeaderColumn>
        <TableHeaderColumn style={style.tableCell}>Supprimer</TableHeaderColumn>
      </TableRow>
    )
  }

  renderList = () => {
    const { apolloData, onEdit, onPrefetch, onDelete } = this.props
    this.list = this.formatList(apolloData.viewer.notes.edges)
    this.count = apolloData.viewer.notes.count
    return this.list.map((note, index) => (
      <TableRow key={index} selected={note.selected}>
        <TableRowColumn style={style.tableCell}>{note.owner.firstName}</TableRowColumn>
        <TableRowColumn style={style.tableCell}>{note.name}</TableRowColumn>
        <TableRowColumn style={style.tableCell}>{note.displayDate}</TableRowColumn>
        <TableRowColumn style={style.tableCell}>
          <FlatButton
            onTouchTap={() => onEdit(note.id)}
            onMouseOver={() => onPrefetch(note.id)}
            icon={<ActionAndroid />}
            style={style.button}
          />
        </TableRowColumn>
        <TableRowColumn style={style.tableCell}>
          <FlatButton
            onTouchTap={() => onDelete(note.id)}
            icon={<ActionAndroid />}
            style={style.button}
          />
        </TableRowColumn>
      </TableRow>
    ))
  }
}

const { shape, arrayOf, string, number, func, bool } = PropTypes

NoteTable.propTypes = {
  apolloData: shape({
    loading: bool,
    viewer: shape({
      notes: shape({
        edges: arrayOf(shape({
          node: shape({
            id: string,
            name: string,
            amount: string,
            date: PropTypes.date,
            owner: shape({
              email: string,
              firstName: string,
              avatar: string,
            }),
            attachements: shape({
              count: number,
            }),
          }),
        })),
      }),
    }),
  }),
  onDelete: func,
  onEdit: func,
  onPrefetch: func,
}
