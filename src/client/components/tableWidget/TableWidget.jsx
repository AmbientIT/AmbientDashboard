import React, { Component, PropTypes } from 'react'
import radium from 'radium'
import { Table, TableBody, TableHeader } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import style from './tableWidget.style'

@radium()
export class TableWidget extends Component {
  fetchMore = () => {
    this.props.fetchMore(this.list[this.list.length - 1].cursor)
  }

  render() {
    return (
      <section>
        <header style={style.header}>
          {this.props.title}
        </header>
        <Table
          height={this.props.height}
          fixedHeader
          fixedFooter
          selectable
          multiSelectable
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
            deselectOnClickaway
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
  apolloData: PropTypes.shape({
    // loading: PropTypes.bool,
    viewer: PropTypes.shape(),
  }),
}

TableWidget.defaultProps = {
  height: '100%',
}
