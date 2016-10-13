import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import { logout } from '../auth/_actions/auth.actions'

@connect(
  state => state.auth ? state.auth.loggedUser : {},
  dispatch => bindActionCreators({ logout }, dispatch)
)
export default class Dashboard extends Component {
  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    logout: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    open: false,
  }

  navLinks = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Notes de frais',
      path: '/note',
    },
  ]

  handleToggle = () => {
    this.setState({ open: !this.state.open })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  logout = () => {
    this.props.logout()
    this.context.router.go('/login')
  }

  render() {
    return (
      <main>
        <AppBar
          title="Note de Frais"
          // onTitleTouchTap={this.handleToggle}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        { this.props.children }
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem onTouchTap={this.logout}>
            Logout
          </MenuItem>
          {this.navLinks.map(nav => {
            return (
              <Link	to={nav.path} key={nav.label}>
                <MenuItem onTouchTap={this.handleClose}>
                  {nav.label}
                </MenuItem>
              </Link>
            )
          })}
        </Drawer>
      </main>
    )
  }
}
