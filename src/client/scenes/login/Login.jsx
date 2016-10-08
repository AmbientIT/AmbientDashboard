import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { googleLogin } from '../../store/actions/login.actions'
import GoogleAuthPopup from '../../services/GoogleAuthPopup'

const { string, func } = PropTypes

@connect(
  () => ({}),
  dispatch => bindActionCreators({ googleLogin }, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    googleLogin: func,
    clientId: string,
    redirectUri: string,
    scope: string,
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
      this.context.router.push('/note')
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
