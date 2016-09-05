const {
  optimize: {
    OccurrenceOrderPlugin,
  },
  HotModuleReplacementPlugin,
  NoErrorsPlugin,
} = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      `${process.cwd()}/src/client/index.jsx`,
    ],
  },
  output: {
    path: `${process.cwd()}/src/public`,
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new OccurrenceOrderPlugin(),
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
  ],
}
