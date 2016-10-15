import React, { PropTypes, Component } from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ApolloProvider } from 'react-apollo'
import { RouterContext, match } from 'react-router'
import { StyleRoot } from 'radium'
import { Locales } from 'locale'
import fs from 'fs'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { env } from '../../../_core'

export const _match = (params) => {
  return new Promise((resolve, reject) => {
    match(params, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error)
      } else {
        resolve({ redirectLocation, renderProps })
      }
    })
  })
}

export const getApolloClient = ({ headers }) => {
  return new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface(`http://localhost:${env.PORT}/graphql`, {
      headers,
    }),
  })
}

export const getGlobalCss = () => {
  return fs.readFileSync(`${process.cwd()}/node_modules/normalize.css/normalize.css`, { encoding: 'utf8' })
}

export const getLocale = headers => {
  const locales = new Locales(headers['accept-language'])
  return locales.best(new Locales(env.languages)).code
}

// todo find why i cant use this as a component ???!!?!?? and move this in another file
// export const App = ({ ctx, renderProps }) => {
//   const { request: { headers } } = ctx
//   const userAgent = headers['user-agent']
//   const muiTheme = getMuiTheme(Object.assign({ userAgent }, lightBaseTheme))
//   return (
//     <MuiThemeProvider muiTheme={muiTheme} radiumConfig={{ userAgent }}>
//       <StyleRoot>
//         <ApolloProvider client={getApolloClient({ headers })} >
//           <RouterContext {...renderProps} />
//         </ApolloProvider>
//       </StyleRoot>
//     </MuiThemeProvider>
//   )
// }

export class App extends Component {
  render() {
    const { ctx, renderProps } = this.props
    const { request: { headers } } = ctx
    const userAgent = headers['user-agent']
    const muiTheme = getMuiTheme(Object.assign({ userAgent }, lightBaseTheme))
    return (
      <MuiThemeProvider muiTheme={muiTheme} radiumConfig={{ userAgent }}>
        <StyleRoot>
          <ApolloProvider client={getApolloClient({ headers })} >
            <RouterContext {...renderProps} />
          </ApolloProvider>
        </StyleRoot>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  ctx: PropTypes.shape({
    request: PropTypes.shape({
      headers: PropTypes.object,
    }),
  }),
  renderProps: PropTypes.object,
}
