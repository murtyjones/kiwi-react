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
    addOrEditLesson: './src/admin/AddOrEditLesson/AddOrEditLesson.js',
    // addOrEditLessonTheme: './src/admin/AddOrEditLessonTheme/AddOrEditLessonTheme.js',
    // addOrEditVariable: './src/admin/AddOrEditVariable/AddOrEditVariable.js',
    // addOrEditSubscription: './src/admin/AddOrEditSubscription/AddOrEditSubscription.js',
    // manageLessons: './src/admin/ManageLessons/ManageLessons.js',
    // manageLessonThemes: './src/admin/ManageLessonThemes/ManageLessonThemes.js',
    // manageVariables: './src/admin/ManageVariables/ManageVariables.js',
    // manageSubscriptions: './src/admin/ManageSubscriptions/ManageSubscriptions.js',
    // signups: './src/admin/Signups/Signups.js',
  },
  output: {
    path: path.join(__dirname, '../build/build/js'),
    filename: '[name].bundle.js',
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
        // exclude `my-excluded-chunk`
        return chunk.name !== 'main'
      }
    }
  }
}

