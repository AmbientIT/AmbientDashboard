import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

export class ActionButtons extends Component {
  render() {
    const { buttons, selectedRowIds } = this.props
    return (
      <footer>
        {selectedRowIds.length !== 0 && buttons.map((button, index) => (
          <FlatButton
            key={index}
            style={button.style}
            type="button"
            label={button.label}
            disabled={selectedRowIds.length === 0}
            onTouchTap={() => button.handler(selectedRowIds)}
          />
        ))}
      </footer>
    )
  }
}

ActionButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape()),
  selectedRowIds: PropTypes.arrayOf(PropTypes.string),
}
