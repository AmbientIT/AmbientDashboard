import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'

const Html = ({ markup, initialState, apolloState }) => {
  // const icon = require('../../../public/favicon.ico')

  const initialStateScript = `
    window.APOLLO_STATE=${serialize(apolloState)};
    window.INITIAL_STATE=${serialize(Object.assign(initialState, apolloState))};
  `

  return (
    <html lang="fr">
      <head>
        <base href="/" />
        <meta charSet="utf-8" />
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

Html.propTypes = {
  assets: PropTypes.object,
  initialState: PropTypes.object,
  apolloState: PropTypes.object,
  markup: PropTypes.string,
}

export default Html
