import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'

const getInitialScript = ({ initialState }) => (`
  window.INITIAL_STATE=${serialize(initialState)};
`)

const Html = ({ markup, initialState, locale }) => (
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
      <script dangerouslySetInnerHTML={{ __html: getInitialScript({ initialState }) }} />
      <script src="main.js" />
    </body>
  </html>
)


Html.propTypes = {
  initialState: PropTypes.shape(),
  markup: PropTypes.string,
  locale: PropTypes.string,
}

Html.defaultProps = {
  locale: 'en',
}

export default Html
