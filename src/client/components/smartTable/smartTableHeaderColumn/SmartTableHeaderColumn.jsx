import React, { Component, PropTypes } from 'react'
import radium from 'radium'
import { TableHeaderColumn } from 'material-ui/Table'
import SortIcon from 'material-ui/svg-icons/action/swap-vert'
import style from './smartTableHeaderColumn.style'

@radium()
export class SmartTableHeaderColumn extends Component {

  render() {
    const { label, sortByColumn, sortable } = this.props
    return (
      <TableHeaderColumn>
        <div style={style.rowAlign}>
          {label}
          {sortable
            ? <SortIcon
              style={style.sortIcon}
              onTouchTap={() => sortByColumn(label)}
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
  sortByColumn: PropTypes.func,
  sortable: PropTypes.bool,
}
