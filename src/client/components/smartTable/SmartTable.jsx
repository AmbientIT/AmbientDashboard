import React, { PropTypes, Component } from 'react'
import { Table, TableBody, TableHeader, TableFooter, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import MDSpinner from 'react-md-spinner'
import radium from 'radium'
import { formatTableCell } from './_lib'
import { SmartTableHeaderColumn, ActionButtons } from './index'
import style from './smartTable.style'

@radium()
export class SmartTable extends Component {
  state = { selectedRowIds: [] }

  handleRowSelection = async row => {
    const { data } = this.props
    let selectedRowIds
    switch (row) {
      case 'all':
        selectedRowIds = data.map(item => item.id)
        break
      case 'none':
        // todo fix this case
        selectedRowIds = []
        break
      default:
        selectedRowIds = row.map(idx => data[idx].id)
        break
    }
    await this.setState({ selectedRowIds })
  }

  renderBody() {
    const { headers, data, bodyProps } = this.props
    return (
      <TableBody {...bodyProps}>
        {!!data && data.map((row, index) => (
          <TableRow key={index} selected={!!this.state.selectedRowIds.find(id => id === row.id)}>
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
    const { headers, data, count, headerProps, isLoading, tableProps, onFetchMore, onSortByColumn, actionButtons } = this.props
    return (
      <section>
        <ActionButtons buttons={actionButtons} selectedRowIds={this.state.selectedRowIds} />
        <Table style={style.table} {...tableProps} onRowSelection={this.handleRowSelection}>
          <TableHeader {...headerProps}>
            <TableRow>
              {!!headers && headers.map((header, index) => (
                <SmartTableHeaderColumn key={index} {...{ onSortByColumn, ...header }} />
              ))}
            </TableRow>
          </TableHeader>
          {isLoading ? <MDSpinner /> : this.renderBody()}
          <TableFooter>
            <TableRow>
              <TableRowColumn colSpan={headers.length - 1}>
                <FlatButton
                  style={style.loadMore}
                  type="button"
                  label="Load More"
                  disabled={data ? this.props.count === data.length : false}
                  onTouchTap={() => onFetchMore()}
                />
              </TableRowColumn>
              <TableRowColumn>
                {isLoading ? '' : `${data.length} / ${count}` }
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
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
  actionButtons: PropTypes.arrayOf(PropTypes.shape()),
  onFetchMore: PropTypes.func,
  isLoading: PropTypes.bool,
  onSortByColumn: PropTypes.func,
}
