'use strict'

const path = require('path')
const webpack = require('webpack')
const devConfig = require('../config/development.json')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  context: path.join(__dirname, '../'),
  entry: {
    main: './src/Main.js',
    AddOrEditLesson: './src/admin/AddOrEditLesson/AddOrEditLesson.js',
    AddOrEditVariable: './src/admin/AddOrEditVariable/AddOrEditVariable.js',
    AddOrEditSubscription: './src/admin/AddOrEditSubscription/AddOrEditSubscription.js',
    ManageLessons: './src/admin/ManageLessons/ManageLessons.js',
    ManageVariables: './src/admin/ManageVariables/ManageVariables.js',
    ManageSubscriptions: './src/admin/ManageSubscriptions/ManageSubscriptions.js',
    Signups: './src/admin/Signups/Signups.js',
    ProviderLoginOrRegister: './src/ProviderLoginOrRegister/ProviderLoginOrRegister',
    Lessons: './src/LessonMap/LessonMap',
  },
  output: {
    path: path.join(__dirname, '../build/build/js'),
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
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {}
      }
    ]
  },
  plugins: [
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

  },
  optimization: {
    splitChunks: {
      chunks (chunk) {
        return chunk.name !== 'main'
      }
    }
  }
}