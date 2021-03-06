import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { googleLogin as googleAuth } from '../../store/actions/auth'

@connect(
  state => state.login ? { isLoading: state.login.isLoading } : {},
  dispatch => bindActionCreators({ googleLogin: googleAuth }, dispatch)
)
export default class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  }

  loginFailure = err => {
    console.error('error login', err)
  }

  loginHandler = async ({ code }) => {
    try {
      const { googleLogin, clientId, redirectUri } = this.props
      await googleLogin({ code, clientId, redirectUri })
      this.context.router.push('/')
    } catch (err) {
      console.error('login error', err)
    }
  }

  render() {
    return (
      <GoogleLogin
        clientId={this.props.clientId}
        buttonText="Login"
        onSuccess={this.loginHandler}
        onFailure={this.loginFailure}
        offline
      />
    )
  }
}

Login.propTypes = {
  googleLogin: PropTypes.func,
  clientId: PropTypes.string,
  redirectUri: PropTypes.string,
}

Login.defaultProps = {
  clientId: process.env.GOOGLEID,
  redirectUri: process.env.GOOGLEREDIRECTURI,
  scope: process.env.GOOGLESCOPE,
}
