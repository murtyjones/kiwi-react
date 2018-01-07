'use strict'

const path = require('path')
const webpack = require('webpack')
const localConfig = require('../config/default.json')
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

process.env.BABEL_ENV = 'local-webpack'
module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
  },
  context: path.join(__dirname, '../'),
  entry: [
    'react-hot-loader/patch'
    , 'webpack-hot-middleware/client'
    , './src/Main.js'
  ],
  output: {
    path: path.join(__dirname, '../build/js'),
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  externals: {
    config: JSON.stringify(localConfig)
  },
  node: {
    fs: "empty"
  },
  resolve: {

  }
}
