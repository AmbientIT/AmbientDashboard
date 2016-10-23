import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import radium from 'radium'
import IconButton from 'material-ui/IconButton'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'

@radium()
export class NoteActionColumn extends Component {
  render() {
    const { onNoteRemove, onNotePrefetch, note } = this.props
    return (
      <div>
        <Link to={`/note/edit/${note.id}`}>
          <IconButton onMouseEnter={() => onNotePrefetch(note.id)}>
            <ModeEdit />
          </IconButton>
        </Link>
        <IconButton onTouchTap={() => onNoteRemove(note.id)}>
          <Delete />
        </IconButton>
      </div>
    )
  }
}

NoteActionColumn.propTypes = {
  note: PropTypes.shape(),
  onNoteRemove: PropTypes.func,
  onNotePrefetch: PropTypes.func,
}
