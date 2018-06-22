'use strict'

const path = require('path')
const webpack = require('webpack')
const prodConfig = require('../config/prod.json')

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  context: path.join(__dirname, '../'),
  entry: {
    main: './src/Main.js',
    AddOrEditLesson: './src/admin/AddOrEditLesson/AddOrEditLesson.js',
    AddOrEditLessonTheme: './src/admin/AddOrEditLessonTheme/AddOrEditLessonTheme.js',
    AddOrEditVariable: './src/admin/AddOrEditVariable/AddOrEditVariable.js',
    AddOrEditSubscription: './src/admin/AddOrEditSubscription/AddOrEditSubscription.js',
    ManageLessons: './src/admin/ManageLessons/ManageLessons.js',
    ManageLessonThemes: './src/admin/ManageLessonThemes/ManageLessonThemes.js',
    ManageVariables: './src/admin/ManageVariables/ManageVariables.js',
    ManageSubscriptions: './src/admin/ManageSubscriptions/ManageSubscriptions.js',
    Signups: './src/admin/Signups/Signups.js',
    ProviderLoginOrRegister: './src/ProviderLoginOrRegister/ProviderLoginOrRegister',
    Lessons: './Lessons/Lessons',
    ForgotPasswordWizard: './ForgotPasswordWizard/ForgotPasswordWizard'
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
    config: JSON.stringify(prodConfig)
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

