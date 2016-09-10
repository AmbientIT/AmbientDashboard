// import IsomorphicRelay from 'isomorphic-relay'
// import { renderToString } from 'react-dom/server'
// import { DefaultNetworkLayer } from 'relay'

export default (router) => {
  router.get('/*', ctx => ctx.render('index'))
}
