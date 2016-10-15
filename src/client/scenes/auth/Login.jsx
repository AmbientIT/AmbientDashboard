import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { googleLogin } from './_actions/auth.actions'

const { string, func } = PropTypes

@connect(
  state => state.login ? { isLoading: state.login.isLoading } : {},
  dispatch => bindActionCreators({ googleLogin }, dispatch)
)
export default class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  }

  googleAuthPopup = async () => {
    const { googleLogin, clientId, redirectUri } = this.props // eslint-disable-line
    try {
      await googleLogin({ clientId, redirectUri })
      this.context.router.push('/note')
    } catch (err) {
      console.error('login error', err)
    }
  }

  render() {
    return (
      <button onClick={this.googleAuthPopup}>Google</button>
    )
  }
}

Login.propTypes = {
  googleLogin: func,
  clientId: string,
  redirectUri: string,
  scope: string,
}

Login.defaultProps = {
  clientId: process.env.GOOGLEID,
  redirectUri: process.env.GOOGLEREDIRECTURI,
  scope: process.env.GOOGLESCOPE,
}
