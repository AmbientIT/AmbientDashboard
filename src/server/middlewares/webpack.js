import webpack from 'webpack'
import connect from 'koa-connect'
import convert from 'koa-convert'
import compose from 'koa-compose'
import webpackDev from 'webpack-dev-middleware'
import webpackHot from 'koa-webpack-hot-middleware'
import webpackConfig from '../../client/_webpack/common'

const compiler = webpack(webpackConfig)

const webpackDevInstance = webpackDev(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
})

/**
 * wait for webpack to finish his job
 * @return {Promise<void>} resolve when ready
 */
export const waitForWebpack = () => {
  return new Promise(resolve => webpackDevInstance.waitUntilValid(resolve))
}

export const webpackDevMiddleware = () => compose([
  convert(connect(webpackDevInstance)),
  convert(webpackHot(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })),
])
