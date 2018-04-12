'use strict'

const path = require('path')
const webpack = require('webpack')
const devConfig = require('../config/development.json')

module.exports = {
  mode: 'development',
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
    new UglifyJSPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu|en-gb|en-ca/)
  ],
  externals: {
    config: JSON.stringify(devConfig)
  },
  node: {
    fs: "empty"
  },
  resolve: {

  }
}

