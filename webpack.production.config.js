const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// PostCSS dependencies
const lost = require('lost')
const precss = require('precss')
const cssnano = require('cssnano')
const mqpacker = require('css-mqpacker')
const fontMagician = require('postcss-font-magician')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const atImport = require('postcss-import')
const postCSSFocus = require('postcss-focus')

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    path.join(__dirname, 'src/js/app.js')
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[hash:base64:4]!postcss-loader')
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
  
  node: {
    process: false
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
      mqpacker,
      cssnano({ autoprefixer: false })
    ]
  }
}
