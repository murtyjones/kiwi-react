// Transform all required files with Babel
require('babel-register')

const gulp = require('gulp')
const gutil = require('gulp-util')
const eslint = require('gulp-eslint')
const eslintFormatter = require('eslint-friendly-formatter')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const historyApiFallback = require('connect-history-api-fallback')


const webpackConfig = require('./webpack/webpack.config.local.js')

const browserSync = require('browser-sync').create()

const jsFiles = [
  'src/**/*.js',
  '*.js',
  'webpack/**/*.js',
  'testing/**/*.js'
]


gulp.task('default', [], () => {
  gulp.watch(jsFiles).on('change', file => {
    gulp
      .src(file.path)
      .pipe(eslint('./.eslintrc'))
      .pipe(eslint.format(eslintFormatter))
      .pipe(eslint.result(result => {
        const warnings = result.warningCount
        const errors = result.errorCount
        if(!warnings && !errors) {
          gutil.log('Eslint found', gutil.colors.green('zero issues'))
        } else {
          gutil.log('Eslint found',
            gutil.colors.yellow(warnings + ' warning(s)'),
            gutil.colors.red(errors + ' error(s)')
          )
        }
      }))
  })

  const myWebpack = webpack(webpackConfig)
  browserSync.init({
    server: {
      baseDir: './',
      middleware: [
        historyApiFallback(),
        webpackDevMiddleware(myWebpack, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            modules: false,
            chunks: false,
            colors: true
          },
          headers: {
            'Access-Control-Allow-Origin': 'localhost:3000'
          }
        }),
        webpackHotMiddleware(myWebpack)
      ]
    },
    files: [
      'index.html',
      'static/**/*'
    ],
    open: false
  })
  gulp.watch('index.html', browserSync.reload())

})


gulp.task('lint', () => {
  return gulp
    .src(jsFiles)
    .pipe(eslint('./.eslintrc'))
    .pipe(eslint.format(eslintFormatter))
    .pipe(eslint.result(result => {
      const warnings = result.warningCount
      const errors = result.errorCount
      if(!warnings && !errors) {
        gutil.log('Eslint found', gutil.colors.green('zero issues'))
      } else {
        gutil.log('Eslint found',
          gutil.colors.yellow(warnings + ' warning(s)'),
          gutil.colors.red(errors + ' error(s)')
        )
      }
    }))
})
