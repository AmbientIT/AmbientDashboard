import React, { PropTypes } from 'react'
import { withApollo } from 'react-apollo'
import { Link } from 'react-router'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { FETCH_NOTES } from './_graphql'

const style = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
}

const Note = ({ children, client }) => {
  client.query({
    query: FETCH_NOTES,
  })
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
  children: PropTypes.node,
  client: PropTypes.shape({
    query: PropTypes.func,
  }),
}

export default withApollo(Note)
