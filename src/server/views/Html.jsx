import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'

const getInitialScript = ({ initialState, apolloState }) => (`
  window.APOLLO_STATE=${serialize(apolloState)};
  window.INITIAL_STATE=${serialize(Object.assign(initialState, apolloState))};
`)

const Html = ({ markup, initialState, apolloState, locale }) => (
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
      <script dangerouslySetInnerHTML={{ __html: getInitialScript({ initialState, apolloState }) }} />
      <script src="main.js" />
    </body>
  </html>
)


Html.propTypes = {
  initialState: PropTypes.shape(),
  apolloState: PropTypes.shape(),
  markup: PropTypes.string,
  locale: PropTypes.string,
}

Html.defaultProps = {
  locale: 'en',
}

export default Html
