import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { GET_NOTES } from '../../../apollo'

@graphql(GET_NOTES)
export default class Home extends Component {
  render() {
    return (
      <h1>Home</h1>
    )
  }
}
