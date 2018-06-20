'use strict'

const path = require('path')
const webpack = require('webpack')
const devConfig = require('../config/development.json')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  context: path.join(__dirname, '../'),
  entry: {
    index: './src/Main.js',
    lessons: './src/Lessons/Lessons.js',
    manageLessonThemes: './src/admin/ManageLessonThemes/ManageLessonThemes.js',
    addOrEditSubscription: './src/admin/AddOrEditSubscription/AddOrEditSubscription.js',
    manageLessons: './src/admin/ManageLessons/ManageLessons.js',
    addOrEditVariable: './src/admin/AddOrEditVariable/AddOrEditVariable.js',
    addOrEditLessonTheme: './src/admin/AddOrEditLessonTheme/AddOrEditLessonTheme.js',
    addOrEditLesson: './src/admin/AddOrEditLesson/AddOrEditLesson.js',
    providerDashboard: './src/ProviderDashboard/ProviderDashboard.js',
    landing: './src/Landing/Landing.js',
    userLessonWizard: './src/UserLessonWizard/UserLessonWizard.js',
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
      chunks: 'all'
    }
  }
}

