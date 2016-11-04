const webpackMerge = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const { HOST, PORT, google } = require('../src/server/_core').env
const ENV = require('yargs').argv.env || 'development'

module.exports = webpackMerge.smart(require(`./${ENV}`), { //eslint-disable-line
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    modules: [
      `${process.cwd()}/src/client`,
      `${process.cwd()}/node_modules`,
    ],
    alias: {

    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx|.js$/,
        loaders: ['eslint-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', { modules: false }],
            'stage-0',
            'react',
          ],
          plugins: [
            'transform-decorators-legacy',
            'transform-runtime',
          ],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loader: 'file?name=../../server/public/img/[name].[ext]',
      },
      {
        test: /\.woff2?$/,
        loader: 'url?name=../../server/public/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file?name=../../server/public/fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: `'${ENV}'`,
        CLIENT: true,
        API: { HOST: `'${HOST}'`, PORT: `'${PORT}'` },
        GOOGLEID: `'${google.GOOGLEID}'`,
        GOOGLEREDIRECTURI: `'${google.REDIRECTURI}'`,
        GOOGLESCOPE: `'${google.SCOPE}'`,
      },
    }),
  ],
})
