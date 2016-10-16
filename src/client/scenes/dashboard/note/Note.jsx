import React, { PropTypes, Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { FETCH_NOTES } from './_graphql'

const style = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
}

@graphql(FETCH_NOTES)
class Note extends Component { //eslint-disable-line
  render() {
    const { children } = this.props
    return (
      <div>
        <Link to="/note/create" style={style}>
          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        {children}
      </div>
    )
  }
}

Note.propTypes = {
  children: PropTypes.node,
}

export default Note
