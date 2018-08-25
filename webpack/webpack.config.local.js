'use strict'

const path = require('path')
const webpack = require('webpack')
const localConfig = require('../config/default.json')

process.env.BABEL_ENV = 'local-webpack'
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
  },
  context: path.join(__dirname, '../'),
  entry: {
    main: [
      'react-hot-loader/patch'
      , 'webpack-hot-middleware/client'
      , './src/Main.js'
    ]
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    publicPath: '/build/js/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(random-words)\/).*/,
        loader: 'babel-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {}
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu|en-gb|en-ca/),
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    config: JSON.stringify(localConfig)
  },
  node: {
    fs: 'empty'
  },
  resolve: {

  }
}
