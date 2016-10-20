import React, { PropTypes, Component } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

export class NoteToolbar extends Component {
  state = {
    filter: {
      user: 0,
    },
    input: {
      field: 'name',
      value: '',
    },
  }

  handleUserChange = (evt, idx) => {
    this.setState({ filter: { user: idx } })
  }

  handleFilterChange = (evt, idx, payload) => {
    this.setState({
      input: {
        field: payload,
      },
    })
  }

  renderFilterField() {
    const { onFilterName, onFilterDate } = this.props
    switch (this.state.input.field) {
      case 'date':
        return <DatePicker hintText="Pick a date" onChange={evt => onFilterDate(evt.target.value)} />
      case 'name':
      default:
        return <TextField hintText="Enter some text" onChange={evt => onFilterName(evt.target.value)} />
    }
  }

  render() {
    return (
      <Toolbar>
        <ToolbarTitle text="Notes de frais" />
        <ToolbarGroup firstChild>
          <DropDownMenu value={this.state.input.field} onChange={this.handleFilterChange}>
            <MenuItem value="name" primaryText="filter by name" />
            <MenuItem value="date" primaryText="filter by date" />
          </DropDownMenu>
          {this.renderFilterField()}
        </ToolbarGroup>
        {/* <ToolbarGroup>
          <DropDownMenu value={this.state.filter.user} onChange={this.handleUserChange}>
            <MenuItem value={0} primaryText="All users" />
            <MenuItem value={1} primaryText="All Voice" />
            <MenuItem value={2} primaryText="All Text" />
          </DropDownMenu>
        </ToolbarGroup> */}
      </Toolbar>
    )
  }
}

NoteToolbar.propTypes = {
  onFilterName: PropTypes.func,
  onFilterDate: PropTypes.func,
}
