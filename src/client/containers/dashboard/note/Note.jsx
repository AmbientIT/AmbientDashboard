import React from 'react'
import { Link } from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const style = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
}

const Note = ({ children }) => {
  return (
    <div>
      <Link	to="/note/add" style={style}>
        <FloatingActionButton>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
      {children}
    </div>
  )
}

Note.propTypes = {
  children: React.PropTypes.node,
}

export default Note
