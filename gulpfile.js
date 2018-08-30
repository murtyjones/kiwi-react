
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
const del = require('del')
const rename = require('gulp-rename')


const webpackLocalConfig = require('./webpack/webpack.config.local.js')
const webpackDevConfig = require('./webpack/webpack.config.dev.js')
const webpackStageConfig = require('./webpack/webpack.config.stage.js')
const webpackProdConfig = require('./webpack/webpack.config.prod.js')

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
        if (!warnings && !errors) {
          gutil.log('Eslint found', gutil.colors.green('zero issues'))
        } else {
          gutil.log('Eslint found',
            gutil.colors.yellow(warnings + ' warning(s)'),
            gutil.colors.red(errors + ' error(s)')
          )
        }
      }))
  })

  const myWebpack = webpack(webpackLocalConfig)
  browserSync.init({
    server: {
      baseDir: './public',
      middleware: [
        historyApiFallback(),
        webpackDevMiddleware(myWebpack, {
          publicPath: webpackLocalConfig.output.publicPath,
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
      if (!warnings && !errors) {
        gutil.log('Eslint found', gutil.colors.green('zero issues'))
      } else {
        gutil.log('Eslint found',
          gutil.colors.yellow(warnings + ' warning(s)'),
          gutil.colors.red(errors + ' error(s)')
        )
      }
    }))
})



// Production build
gulp.task('build:production', ['copy-public', 'copy-assets', 'write-version:production', 'webpack:build:production'])

// Dev build
gulp.task('build:development', ['copy-public', 'copy-assets', 'write-version:development', 'webpack:build:development'])

// Stage build
gulp.task('build:stage', ['copy-public', 'copy-assets', 'write-version:stage', 'webpack:build:stage'])

const writeVersion = () => {
  const modifyFile = require('gulp-modify-file')
  const version = require('./version')
  gulp.src('build/index.html')
    .pipe(modifyFile((content, path, file) => {
      return content.replace('main.bundle.js', `main.${version}.bundle.js`)
    }))
    .pipe(gulp.dest('./build'))
  gulp.src('./build/build/js/main.bundle.js')
    .pipe(rename(`./build/build/js/main.${version}.bundle.js`))
    .pipe(gulp.dest('./'))
  gulp.src('./build/build/js/main.bundle.js.map')
    .pipe(rename(`./build/build/js/main.${version}.bundle.js.map`))
    .pipe(gulp.dest('./'))
  return del([
    './build/build/js/main.bundle.js*'
  ])
}

gulp.task('write-version:production', ['copy-public', 'webpack:build:production'], function () {
  writeVersion()
})

gulp.task('write-version:development', ['copy-public', 'webpack:build:development'], function () {
  writeVersion()
})

gulp.task('write-version:stage', ['copy-public', 'webpack:build:stage'], function () {
  writeVersion()
})

gulp.task('copy-public', ['clean'], function () {
  return gulp
    .src(['./public/**'])
    .pipe(gulp.dest('build'))

})

gulp.task('copy-assets', ['clean'], function () {
  return gulp
    .src(['./assets/**'])
    .pipe(gulp.dest('build/assets'))
})

gulp.task('clean', function () {
  return del([
    './build/build/js/*'
    , './build/*html'
    , './build/assets/*'
  ])
})

gulp.task('webpack:build:production', function (callback) {
  // run webpack
  return webpack(webpackProdConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build:production', err)
    gutil.log('[webpack:build:production]', stats.toString({ colors: true }))
    callback()
  })
})

gulp.task('webpack:build:development', function (callback) {
  // run webpack
  return webpack(webpackDevConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build:development', err)
    gutil.log('[webpack:build:development]', stats.toString({ colors: true }))
    callback()
  })
})

gulp.task('webpack:build:stage', function (callback) {
  // run webpack
  return webpack(webpackStageConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build:stage', err)
    gutil.log('[webpack:build:stage]', stats.toString({ colors: true }))
    callback()
  })
})

gulp.task('run-win', function (){
  gulp.watch('/src/Main.js')
})