const webpackMerge = require('webpack-merge')
const { DefinePlugin } = require('webpack')

const ENV = require('yargs').argv.env || 'development'

module.exports = webpackMerge.smart(require(`./${ENV}`), {
  resolve: {
    root: `${process.cwd()}/src/client`,
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules'],
    alias: {
      styles: `${process.cwd()}/src/client/styles`,
    },
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx|.js$/,
        loaders: ['eslint-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loaders: ['isomorphic-style-loader', 'style-loader', 'css-loader'],
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
        NODE_ENV: `"${ENV}"`,
        CLIENT: true,
      },
    }),
  ],
})
