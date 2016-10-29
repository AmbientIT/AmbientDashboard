import webpack from 'webpack'
import convert from 'koa-convert'
import compose from 'koa-compose'
import webpackDev from 'koa-webpack-dev-middleware'
import webpackHot from 'koa-webpack-hot-middleware'
import webpackConfig from '../../../../webpack/common'

const compiler = webpack(webpackConfig)

export const webpackDevMiddleware = () => compose([
  convert(webpackDev(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  })),
  convert(webpackHot(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })),
])
