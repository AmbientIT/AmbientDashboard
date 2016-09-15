// const path = require('path')
const {
  LoaderOptionsPlugin,
  NoErrorsPlugin,
  optimize: {
    OccurrenceOrderPlugin,
    DedupePlugin,
    UglifyJsPlugin,
  },
} = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './src/platform/browser/index.jsx',
  },
  output: {
    path: 'dist',
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].map',
  },
  module: {
    loaders: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader?variable=data',
      },
    ],
  },
  plugins: [
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new OccurrenceOrderPlugin(),
    new DedupePlugin(),
    new NoErrorsPlugin(),
    new UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      comments: false,
    }),
    new HtmlWebpackPlugin({
      template: 'views/index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: '',
    }]),
  ],
}
