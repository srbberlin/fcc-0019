const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const browserify = require('browserify')
const babelify = require('babelify')
const browserSync = require('browser-sync').create()
const source = require('vinyl-source-stream')
const del = require('del')

var config = {
  src:     __dirname + '/src',
  htmlin:  __dirname + '/src/html/**/*.html',
  cssin:   __dirname + '/src/css/**/*.css',
  jsin:    __dirname + '/src/js/**/*.js',
  jsentry: __dirname + '/src/js/index.js',
  imgin:   __dirname + '/src/img/**/*',
  cssout:  __dirname + '/docs/css/',
  jsout:   __dirname + '/docs/js/',
  imgout:  __dirname + '/docs/img/',
  htmlout: __dirname + '/docs'
}

function reload () {
  browserSync.reload()
}

function serve () {
  browserSync.init({
    server: config.htmlout
  })

  gulp.watch(config.jsin, () => gulp.series(scripts, reload))
  gulp.watch(config.cssin, () => gulp.series(css, reload))
  gulp.watch(config.imgin, () => gulp.series(images, reload))
  gulp.watch(config.htmlin, () => gulp.series(html, reload))
}

function css () {
  let path = config.cssin
  return gulp.src(path)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.cssout))
}

function scripts () {
  return browserify({
    entries: config.jsentry,
    extensions: ['.js'],
    debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(config.jsout))
}

function images () {
  let path = config.imgin
  return gulp.src(path)
    .pipe(gulp.dest(config.imgout))
}

function html () {
  let path = config.htmlin
  return gulp.src(path)
    .pipe(gulp.dest(config.htmlout))
}

function clean () {
  let paths = [
    config.jsout + '/**/*.js',
    config.cssout + '/**/*.css',
    config.imgout + '/**/*',
    config.htmlout + '/**/*.html'
  ]
  let res
  res = del(paths)
  res.then(function () {
  }).catch(function () {
  })
  return res
}

exports.build = gulp.parallel(scripts, css, html, images)
exports.default = serve
