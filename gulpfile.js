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

  const myWebpack = webpack(webpackLocalConfig)
  browserSync.init({
    server: {
      baseDir: './',
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



// Production build
gulp.task("build:production", ["clean", "copy-html", "copy-assets", "webpack:build:production"]);

// Dev build
gulp.task("build:development", ["clean", "copy-html", "copy-assets", "webpack:build:development"]);

// Stage build
gulp.task("build:stage", ["clean", "copy-html", "copy-assets", "webpack:build:stage"]);

gulp.task("copy-html", function() {
  return gulp
    .src(['./index.html'])
    .src(['./maintenance.html'])
    .pipe(gulp.dest('build'))
})

gulp.task("copy-assets", function() {
  return gulp
    .src(['./assets/**'])
    .pipe(gulp.dest('build/assets'))
})

gulp.task("clean", function() {
  return del([
    './build/build/js/*'
    , './build/*html'
    , './build/assets/*'
  ])
})

gulp.task("webpack:build:production", function(callback) {
  // run webpack
  return webpack(webpackProdConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build:production", err);
    gutil.log("[webpack:build:production]", stats.toString({ colors: true }));
    callback();
  });
});

gulp.task("webpack:build:development", function(callback) {
  // run webpack
  return webpack(webpackDevConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build:development", err);
    gutil.log("[webpack:build:development]", stats.toString({ colors: true }));
    callback();
  });
});

gulp.task("webpack:build:stage", function(callback) {
  // run webpack
  return webpack(webpackStageConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build:stage", err);
    gutil.log("[webpack:build:stage]", stats.toString({ colors: true }));
    callback();
  });
});

gulp.task('run-win', function(){
  gulp.watch('/src/Main.js');
})
