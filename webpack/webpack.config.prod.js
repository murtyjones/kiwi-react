'use strict'

const path = require('path')
const webpack = require('webpack')
const prodConfig = require('../config/prod.json')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.join(__dirname, '../'),
  entry: [
    './src/Main.js'
  ],
  output: {
    path: path.join(__dirname, '../build/build/js'),
    filename: 'bundle.js',
    publicPath: '/build/js/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: [ 'style-loader', 'css-loader' ]
    }]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu|en-gb|en-ca/),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin()
  ],
  externals: {
    config: JSON.stringify(prodConfig)
  },
  node: {
    fs: "empty"
  },
  resolve: {

  }
}

