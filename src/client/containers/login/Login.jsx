import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from 'store/actions' // eslint-disable-line
import GoogleAuthPopup from './services/GoogleAuthPopup' // eslint-disable-line

const { googleLogin } = actions.login

console.log(googleLogin)

@connect(
  () => ({}),
  dispatch => bindActionCreators({ googleLogin }, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    googleLogin: React.PropTypes.func,
    clientId: React.PropTypes.string,
    redirectUri: React.PropTypes.string,
    scope: React.PropTypes.string,
  }

  static defaultProps = {
    clientId: process.env.GOOGLEID,
    redirectUri: process.env.GOOGLEREDIRECTURI,
    scope: process.env.GOOGLESCOPE,
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    const { clientId, redirectUri, scope } = props
    this.popup = new GoogleAuthPopup(clientId, redirectUri, scope, 'hey yo !!!')
    this.state = { isLoading: false }
  }

  googleAuthPopup = async () => {
    const { googleLogin, clientId, redirectUri } = this.props // eslint-disable-line
    this.setState({ isLoading: true })
    try {
      const code = await this.popup.show()
      await googleLogin(Object.assign(code, { clientId, redirectUri }))
      this.setState({ isLoading: false })
      this.context.router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <button onClick={this.googleAuthPopup}>Google</button>
    )
  }
}
