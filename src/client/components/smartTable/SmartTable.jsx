import React, { PropTypes, Component } from 'react'
import { Table, TableBody, TableHeader, TableFooter, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import radium from 'radium'
import { formatTableCell } from './_lib'
import { SmartTableHeaderColumn } from './index'
import style from './smartTable.style'

@radium()
export class SmartTable extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { isAsc: false, column: null }
  }

  sortByColumn(column) {
    const isAsc = column === this.state.column ? !this.state.asc : false
    this.setState({ isAsc, column })
    this.props.sortByColumn(column, this.state.isAsc)
  }

  render() {
    const { headers, data, headerProps, bodyProps, tableProps, onFetchMore } = this.props
    const sortByColumn = this.sortByColumn
    return (
      <Table style={style.table} {...tableProps}>
        <TableHeader {...headerProps}>
          <TableRow>
            {!!headers && headers.map((header, index) => (
              <SmartTableHeaderColumn key={index} {...{ sortByColumn, ...header }} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody {...bodyProps}>
          {!!data && data.map((row, index) => (
            <TableRow key={index}>
              {headers.map((header, propIndex) => (
                <TableRowColumn key={propIndex}>
                  {formatTableCell(row[header.key], header.format, row)}
                </TableRowColumn>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn colSpan={headers.length}>
              <FlatButton
                style={style.loadMore}
                type="button"
                label="Load More"
                disabled={data ? this.props.count === data.length : false}
                onTouchTap={() => onFetchMore(data[data.length - 1].cursor)}
              />
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}

SmartTable.propTypes = {
  count: PropTypes.number,
  tableProps: PropTypes.shape(),
  headerProps: PropTypes.shape(),
  bodyProps: PropTypes.shape(),
  headers: PropTypes.arrayOf(PropTypes.shape()),
  data: PropTypes.arrayOf(PropTypes.shape()),
  sortByColumn: PropTypes.func,
  onFetchMore: PropTypes.func,
}


// onRowSelection: row => {
//   const { edges } = this.props.data.viewer.notes
//   switch (row) {
//     case 'all':
//       this.selectedRows = edges.map(item => item.node.id)
//       break
//     case 'none':
//       this.selectedRows = []
//       break
//     default:
//       this.selectedRows = row.map(idx => edges[idx].node.id)
//       break
//   }
//   this.forceUpdate()
// },
