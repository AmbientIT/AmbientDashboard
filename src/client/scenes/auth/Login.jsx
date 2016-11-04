import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { login } from '../../store/actions/auth'

@connect(
  state => state.login ? { isLoading: state.login.isLoading } : {},
  dispatch => bindActionCreators({ login }, dispatch)
)
export default class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  }

  loginFailure = err => {
    console.error('error login', err)
  }

  render() {
    return (
      <GoogleLogin
        clientId={this.props.clientId}
        buttonText="Login"
        onSuccess={this.props.login}
        onFailure={this.loginFailure}
        offline
      />
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  clientId: PropTypes.string,
}

Login.defaultProps = {
  clientId: process.env.GOOGLEID,
}
