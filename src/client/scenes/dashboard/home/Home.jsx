import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { FETCH_NOTES } from '../../../apollo'

@graphql(FETCH_NOTES)
export default class Home extends Component {
  render() {
    return (
      <h1>Home</h1>
    )
  }
}
