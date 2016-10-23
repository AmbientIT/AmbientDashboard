import React, { Component, PropTypes } from 'react'
import radium from 'radium'
import { TableHeaderColumn } from 'material-ui/Table'
import SortIcon from 'material-ui/svg-icons/action/swap-vert'
import style from './smartTableHeaderColumn.style'

@radium()
export class SmartTableHeaderColumn extends Component {

  render() {
    const { label, onSortByColumn, sortable } = this.props
    return (
      <TableHeaderColumn>
        <div style={style.rowAlign}>
          {label}
          {sortable
            ? <SortIcon
              style={style.sortIcon}
              onTouchTap={() => onSortByColumn(label)}
            />
            : ''
          }
        </div>
      </TableHeaderColumn>
    )
  }
}

SmartTableHeaderColumn.propTypes = {
  label: PropTypes.string,
  onSortByColumn: PropTypes.func,
  sortable: PropTypes.bool,
}
