import React, { Component, PropTypes } from 'react'
import serialize from 'serialize-javascript'
import { getGlobalCss } from '../lib'

export class Html extends Component {
  render() {
    const { markup, initialState, apolloState, locale } = this.props
    console.log('apolloState', apolloState)
    const initialStateScript = `
      window.APOLLO_STATE=${serialize(apolloState)};
      window.INITIAL_STATE=${serialize(Object.assign(initialState, apolloState))};
    `
    return (
      <html lang={locale}>
        <head>
          <base href="/" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Ambient</title>
          <style>
            { getGlobalCss() }
          </style>
          {/* <link rel="shortcut icon" href={icon} /> */}
        </head>
        <body>
          <div id="react-container" dangerouslySetInnerHTML={{ __html: markup }} />
          <script dangerouslySetInnerHTML={{ __html: initialStateScript }} />
          <script src="main.js" />
        </body>
      </html>
    )
  }
}

Html.propTypes = {
  assets: PropTypes.object,
  initialState: PropTypes.object,
  apolloState: PropTypes.object,
  markup: PropTypes.string,
  locale: PropTypes.string,
}

Html.defaultProps = {
  locale: 'en',
}

Html.childContextTypes = {
  locale: PropTypes.string,
}
