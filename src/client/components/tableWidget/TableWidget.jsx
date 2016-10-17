import React, { Component, PropTypes } from 'react'
import radium from 'radium'
import { Table, TableBody, TableHeader } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import style from './tableWidget.style'

@radium()
export class TableWidget extends Component {
  selectedRows = []
  fetchMore = () => {
    this.props.fetchMore(this.list[this.list.length - 1].cursor)
  }

  addToSelection = row => {
    switch (row) {
      case 'all':
        this.selectedRows = this.list.map(item => item.node.id)
        break
      case 'none':
        this.selectedRows = []
        break
      default:
        this.selectedRows = row.map(idx => this.list[idx].node.id)
        break
    }
  }

  removeSelected = () => {
    this.props.removeSelected(this.selectedRows)
  }

  render() {
    return (
      <section>
        <header style={style.header}>
          <h2>
            {this.props.title}
          </h2>
          <div>
            <RaisedButton
              style={style.removeSelected}
              type="button"
              label="Remove selected"
              onTouchTap={this.removeSelected}
            />
          </div>
        </header>
        <Table
          height={this.props.height}
          fixedHeader
          selectable
          multiSelectable
          onRowSelection={this.addToSelection}
        >
          <TableHeader
            displaySelectAll
            adjustForCheckbox
            enableSelectAll
          >
            {this.renderHeader()}
          </TableHeader>
          <TableBody
            displayRowCheckbox
            showRowHover
            stripedRows
          >
            {this.props.apolloData.viewer ? this.renderList() : 'loading'}
          </TableBody>
        </Table>
        <footer style={style.header}>
          <RaisedButton
            style={style.loadMore}
            type="button"
            label="Load More"
            disabled={this.list ? this.count === this.list.length : false}
            onTouchTap={this.fetchMore}
          />
        </footer>
      </section>
    )
  }
}

TableWidget.propTypes = {
  height: PropTypes.string,
  title: PropTypes.string,
  fetchMore: PropTypes.func,
  removeSelected: PropTypes.func,
  apolloData: PropTypes.shape({
    // loading: PropTypes.bool,
    viewer: PropTypes.shape(),
  }),
}

TableWidget.defaultProps = {
  height: '100%',
}
