import React, { PropTypes } from 'react'
import radium from 'radium'
import FlatButton from 'material-ui/FlatButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import { TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedNumber, FormattedDate } from 'react-intl'
import { TableWidget } from '../../../../../components/tableWidget/TableWidget'
import style from './noteTable.style'

@radium()
export class NoteTable extends TableWidget {
  constructor(props, context) {
    super(props, context)
    switch (context.locale) {
      case 'en_us':
        this.curency = 'USD'
        break
      default:
        this.currency = 'EUR'
        break
    }
  }

  renderTableHeader = () => {
    return (
      <TableRow>
        <TableHeaderColumn style={style.tableCell}>
          Owner
        </TableHeaderColumn>
        <TableHeaderColumn style={style.tableCell}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn style={style.tableCell}>
          Date
        </TableHeaderColumn>
        <TableHeaderColumn style={style.tableCell}>
          Amount
        </TableHeaderColumn>
        <TableHeaderColumn style={style.tableCell}>
          Edit
        </TableHeaderColumn>
        <TableHeaderColumn style={style.tableCell}>
          Supprimer
        </TableHeaderColumn>
      </TableRow>
    )
  }

  renderTableData = () => {
    const { onEdit, onPrefetch, onDelete, list } = this.props
    return list.map(({ node }, index) => (
      <TableRow key={index} selected={node.selected}>
        <TableRowColumn style={style.tableCell}>
          {node.owner.firstName}
        </TableRowColumn>
        <TableRowColumn style={style.tableCell}>
          {node.name}
        </TableRowColumn>
        <TableRowColumn style={style.tableCell}>
          <FormattedDate value={node.date} />
        </TableRowColumn>
        <TableRowColumn style={style.tableCell}>
          <FormattedNumber value={node.amount} style="currency" currency={this.currency} />
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

const { shape, arrayOf, string, number, func } = PropTypes

NoteTable.propTypes = {
  onDelete: func,
  onEdit: func,
  onPrefetch: func,
  intl: shape({
    formatDate: func,
  }),
  list: arrayOf(shape({
    node: shape({
      id: string,
      name: string,
      amount: number,
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
}
