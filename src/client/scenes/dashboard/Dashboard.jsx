import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import { logout } from '../../store/actions/auth'

@connect(
  ({ user, auth }) => ({
    loggedUser: user.data[auth.loggedUser],
  }),
  dispatch => bindActionCreators({ logout }, dispatch)
)
export default class Dashboard extends Component {
  state = {
    open: false,
    navLinks: [
      {
        label: 'Home',
        path: '/',
      },
      {
        label: 'Notes de frais',
        path: '/note',
      },
    ],
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <main>
        <AppBar
          title="Dashboard"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        { this.props.children }
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <MenuItem onTouchTap={this.props.logout}>
            Logout
          </MenuItem>
          {this.state.navLinks.map(nav => {
            return (
              <Link to={nav.path} key={nav.label}>
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

Dashboard.propTypes = {
  children: PropTypes.node,
  logout: PropTypes.func,
}
