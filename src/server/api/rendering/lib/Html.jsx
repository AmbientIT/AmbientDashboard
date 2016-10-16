import React, { Component, PropTypes } from 'react'
import serialize from 'serialize-javascript'

export class Html extends Component {
  render() {
    const { markup, initialState, apolloState, locale } = this.props
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
  initialState: PropTypes.shape(),
  apolloState: PropTypes.shape(),
  markup: PropTypes.string,
  locale: PropTypes.string,
}

Html.defaultProps = {
  locale: 'en',
}

Html.childContextTypes = {
  locale: PropTypes.string,
}
