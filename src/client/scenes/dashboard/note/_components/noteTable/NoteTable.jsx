import React, { PropTypes } from 'react'
import radium from 'radium'
import FlatButton from 'material-ui/FlatButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import { TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { injectIntl } from 'react-intl'
import { TableWidget } from '../../../../../components/tableWidget/TableWidget'
import style from './noteTable.style'

@radium()
export class NoteTableWidget extends TableWidget {
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
    const { apolloData, onEdit, onPrefetch, onDelete, intl } = this.props
    this.count = apolloData.viewer.notes.count
    this.list = apolloData.viewer.notes.edges
    return this.list.map(({ node }, index) => (
      <TableRow key={index} selected={node.selected}>
        <TableRowColumn style={style.tableCell}>
          {node.owner.firstName}
        </TableRowColumn>
        <TableRowColumn style={style.tableCell}>
          {node.name}
        </TableRowColumn>
        <TableRowColumn style={style.tableCell}>
          {intl.formatDate(node.date)}
        </TableRowColumn>
        <TableRowColumn style={style.tableCell}>
          <FlatButton
            onTouchTap={() => onEdit(node.id)}
            onMouseOver={() => onPrefetch(node.id)}
            icon={<ActionAndroid />}
            style={style.button}
          />
        </TableRowColumn>
        <TableRowColumn style={style.tableCell}>
          <FlatButton
            onTouchTap={() => onDelete(node.id)}
            icon={<ActionAndroid />}
            style={style.button}
          />
        </TableRowColumn>
      </TableRow>
    ))
  }
}

const { shape, arrayOf, string, number, func, bool } = PropTypes

NoteTableWidget.propTypes = {
  intl: shape({
    format: func,
  }),
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

// try to make it work with an es7 decorator
export const NoteTable = injectIntl(NoteTableWidget)
