import React, { Component, PropTypes } from 'react'
import radium from 'radium'
import { Table, TableBody, TableHeader } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import style from './tableWidget.style'

@radium()
export class TableWidget extends Component {
  selectedRows = []

  addToSelection = row => {
    switch (row) {
      case 'all':
        this.selectedRows = this.props.list.map(item => item.node.id)
        break
      case 'none':
        this.selectedRows = []
        break
      default:
        this.selectedRows = row.map(idx => this.props.list[idx].node.id)
        break
    }
  }

  renderRemoveSelectedButton() {
    return (
      <RaisedButton
        style={style.removeSelected}
        type="button"
        label="Remove selected"
        onTouchTap={() => this.props.removeSelected(this.selectedRows)}
      />
    )
  }

  renderTitle() {
    return (
      <h2>
        {this.props.title}
      </h2>
    )
  }

  renderHeader() {
    return (
      <header style={style.header}>
        {this.props.title ? this.renderTitle() : ''}
        <div>
          {this.props.removeSelected ? this.renderRemoveSelectedButton() : ''}
        </div>
      </header>
    )
  }

  renderFooter() {
    return (
      <footer style={style.header}>
        <RaisedButton
          style={style.loadMore}
          type="button"
          label="Load More"
          disabled={this.props.list ? this.props.count === this.props.list.length : false}
          onTouchTap={() => this.props.fetchMore(this.props.list[this.props.list.length - 1].cursor)}
        />
      </footer>
    )
  }

  render() {
    return (
      <section>
        {this.props.title || this.props.removeSelected ? this.renderHeader() : ''}
        <Table
          height={this.props.height}
          fixedHeader
          selectable={this.props.selectable}
          multiSelectable={this.props.selectable}
          onRowSelection={this.addToSelection}
        >
          <TableHeader
            displaySelectAll={this.props.selectable}
            adjustForCheckbox={this.props.selectable}
            enableSelectAll={this.props.selectable}
          >
            {this.renderTableHeader()}
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.props.selectable}
            showRowHover
            stripedRows
          >
            {this.renderTableData()}
          </TableBody>
        </Table>
        {this.props.fetchMore ? this.renderFooter() : ''}
      </section>
    )
  }
}

TableWidget.propTypes = {
  height: PropTypes.string,
  title: PropTypes.string,
  fetchMore: PropTypes.func,
  removeSelected: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.shape()),
  count: PropTypes.number,
  selectable: PropTypes.bool,
}

TableWidget.defaultProps = {
  height: '100%',
}
