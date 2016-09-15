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
    console.log(this.props)
    return (
      <h1>Home</h1>
    )
  }
}

// export default Relay.createContainer(Home, {
//   fragments: {
//     viewer: () => Relay.QL`
//       fragment on Viewer {
//         users(first: 10) {
//           count
//           edges {
//             node {
//               username
//             }
//           }
//         }
//       }
//     `,
//   },
// })
