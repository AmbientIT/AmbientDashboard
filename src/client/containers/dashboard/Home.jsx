/* eslint react/prefer-stateless-function:0 */
import React, { PropTypes, Component } from 'react'
import Relay from 'react-relay'

class Home extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      count: PropTypes.number,
    }),
  }

  render() {
    console.log(this.props)
    return (
      <h1>Home</h1>
    )
  }
}

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 10) {
          count
          edges {
            node {
              username
            }
          }
        }
      }
    `,
  },
})
