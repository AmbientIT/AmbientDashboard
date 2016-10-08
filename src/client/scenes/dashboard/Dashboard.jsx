import React, { Component } from 'react'
import { Link } from 'react-router'
// import { Layout, NavDrawer, Panel, Sidebar, AppBar, IconButton, Checkbox } from 'react-toolbox'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { logout } from '../../services/auth'

injectTapEventPlugin()

export default class Dashboard extends Component {
  static propTypes = {
    open: React.PropTypes.bool,
    children: React.PropTypes.node,
  }

  static contextTypes = {
    router: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      drawerActive: false,
      drawerPinned: false,
      sidebarPinned: false,
      open: false,
    }

    this.navLinks = [
      {
        label: 'Home',
        path: '/',
      },
      {
        label: 'Notes de frais',
        path: '/notes',
      },
    ]
  }

  toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned })
  }

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive })
  }

  toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned })
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  logout = () => {
    logout()
    console.log(this.context.router)
    this.context.router.go('/login')
  }

  render() {
    return (
      // <Layout>
      //   <NavDrawer
      //     active={this.state.drawerActive}
      //     pinned={this.state.drawerPinned} permanentAt="xxxl"
      //     onOverlayClick={this.toggleDrawerActive}
      //   >
      //     <p>
      //         Navigation, account switcher, etc. go here.
      //     </p>
      //   </NavDrawer>
      //   <Panel>
      //     <AppBar>
      //       <IconButton icon="menu" inverse onClick={this.toggleDrawerActive} />
      //     </AppBar>
      //     <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
      //       <Checkbox label="Pin drawer" checked={this.state.drawerPinned} onChange={this.toggleDrawerPinned} />
      //       <Checkbox label="Show sidebar" checked={this.state.sidebarPinned} onChange={this.toggleSidebar} />
      //       {this.props.children}
      //     </div>
      //   </Panel>
      //   <Sidebar pinned={this.state.sidebarPinned} width={5}>
      //     <div>
      //       <IconButton icon="close" onClick={this.toggleSidebar} />
      //     </div>
      //     <div style={{ flex: 1 }}>
      //       <p>Supplemental content goes here.</p>
      //     </div>
      //   </Sidebar>
      // </Layout>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <main>
          <AppBar
            title="Note de Frais"
            iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
            onTitleTouchTap={this.handleToggle}
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
                <Link	to="{nav.path}" key={nav.label}>
                  <MenuItem onTouchTap={this.handleClose}>
                    {nav.label}
                  </MenuItem>
                </Link>
              )
            })}
          </Drawer>
        </main>
      </MuiThemeProvider>
    )
  }
}
