import React, { PropTypes, Component } from 'react'
import { Table, TableBody, TableHeader, TableFooter, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import MDSpinner from 'react-md-spinner'
import radium from 'radium'
import { formatTableCell } from './_lib'
import { SmartTableHeaderColumn } from './index'
import style from './smartTable.style'

@radium()
export class SmartTable extends Component {
  renderBody() {
    const { headers, data, bodyProps } = this.props
    return (
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
    )
  }

  render() {
    const { headers, data, headerProps, isLoading, tableProps, onFetchMore, sortByColumn } = this.props
    return (
      <Table style={style.table} {...tableProps}>
        <TableHeader {...headerProps}>
          <TableRow>
            {!!headers && headers.map((header, index) => (
              <SmartTableHeaderColumn key={index} {...{ sortByColumn, ...header }} />
            ))}
          </TableRow>
        </TableHeader>
        {isLoading ? <MDSpinner /> : this.renderBody()}
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
  isLoading: PropTypes.bool,
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
