const {
  LoaderOptionsPlugin,
  NoErrorsPlugin,
  optimize: {
    OccurrenceOrderPlugin,
    DedupePlugin,
    UglifyJsPlugin,
  },
} = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: `${process.cwd()}/src/client/index.jsx`,
  },
  output: {
    path: 'dist',
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].map',
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
    new CopyWebpackPlugin([{
      from: 'src/public',
      to: '',
    }]),
  ],
}
