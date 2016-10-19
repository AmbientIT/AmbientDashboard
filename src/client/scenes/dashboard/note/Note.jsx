import React, { PropTypes, Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { FETCH_NOTES } from '../../../apollo'
import style from './note.style'

@graphql(FETCH_NOTES)
class Note extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Link to="/note/create" style={style.fab}>
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
