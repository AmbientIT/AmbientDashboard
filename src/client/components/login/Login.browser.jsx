import React, { Component, PropTypes } from 'react'
import GoogleAuthPopup from './_services/GoogleAuthPopup'

export default class Login extends Component {
  static propTypes = {
    googleLogin: PropTypes.func,
    clientId: PropTypes.string,
    redirectUri: PropTypes.string,
    scope: PropTypes.string,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    const { clientId, redirectUri, scope } = props
    this.popup = new GoogleAuthPopup(clientId, redirectUri, scope, 'hey yo !!!')
    this.state = { isLoading: false }
  }

  googleAuthPopup = () => {
    const { googleLogin, clientId, redirectUri } = this.props
    this.setState({ isLoading: true })
    this.popup.show()
      .then(code => googleLogin(Object.assign(code, { clientId, redirectUri })))
      .then(() => {
        console.log('logged in')
        this.setState({ isLoading: false })
        this.context.router.push('/')
      })
  }

  render() {
    return (
      <button onClick={this.googleAuthPopup}>Google</button>
    )
  }
}
