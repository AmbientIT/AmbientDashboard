import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import radium from 'radium'
import IconButton from 'material-ui/IconButton'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'

@radium()
export class NoteActionColumn extends Component {
  render() {
    const { handleRemove, note } = this.props
    return (
      <div>
        <Link to={`/note/edit/${note.id}`}>
          <IconButton>
            <ModeEdit />
          </IconButton>
        </Link>
        <IconButton onTouchTap={() => handleRemove(note.id)}>
          <Delete />
        </IconButton>
      </div>
    )
  }
}

NoteActionColumn.propTypes = {
  note: PropTypes.shape(),
  handleRemove: PropTypes.func,
}
