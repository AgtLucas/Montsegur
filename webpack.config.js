const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// PostCSS dependencies
const lost = require('lost')
const precss = require('precss')
const mqpacker = require('css-mqpacker')
const fontMagician = require('postcss-font-magician')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const atImport = require('postcss-import')
const postCSSFocus = require('postcss-focus')

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/js/app.js')
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?modules&localIdentName=[name]__[local]!postcss-loader']
    }, {
      test: /\.(png|jpe?g|svg|gif)$/,
      loaders: [
        'url-loader?limit=8192'
      ]
    }],
  },

  resolve: {
    extensions: ['', '.js', '.json', '.css']
  },

  postcss: function (webpack) {
    return [
      atImport({ addDependencyTo: webpack }),
      precss,
      fontMagician,
      cssnext({ browsers: ['last 2 versions'] }),
      lost,
      postCSSFocus,
      nested,
      mqpacker
    ]
  }
}
