/* eslint react/prefer-stateless-function:0 */
import React, { PropTypes, Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

@graphql(gql`
  query{
    users{
      username
    }
  }
`)
export default class Home extends Component {
  static propTypes = {
    data: PropTypes.shape({
      users: PropTypes.shape({
        username: PropTypes.string,
      }),
    }),
  }

  render() {
    return (
      <h1>Home</h1>
    )
  }
}
