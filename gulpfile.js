// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var ftp = require('vinyl-ftp'),
    gutil = require('gulp-util'),
    minimist = require('minimist'),
    args = minimist(process.argv.slice(2)),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    sassLint = require('gulp-sass-lint');

var conn = ftp.create({
  host: 'ftp.loki7.com',
  user: args.user,
  password: args.password,
  log: gutil.log
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'));
});

// Lint Our Sass
gulp.task('sass-lint', function() {
  return gulp.src('assets/scss/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/scss/*.scss', ['sass-lint', 'sass']);
});

// Travis CI Tests
gulp.task('ci-tasks', ['sass-lint']);

// Deploy Task
gulp.task('deploy', ['sass', 'clean'], function() {
  var remotePath = '/flickr/';

  var globs = [
    './assets/**/*.css',
    './assets/**/*.css.map',
    './assets/**/*.jpg',
    './assets/**/*.png',
    './assets/**/*.svg',
    './assets/**/*.eot',
    './assets/**/*.ttf',
    './assets/**/*.woff',
    './assets/**/*.woff2',
    './assets/**/*.ico',
    './assets/**/*.js'
  ]

  gulp.src( globs, { base: '.', buffer: false } )
    .pipe(conn.dest(remotePath));

  globs = [
    './index.html'
  ]

  gulp.src( globs, { base: '.', buffer: false } )
    .pipe(conn.dest(remotePath));
});

// Remove Existing Directories on Remote Server
gulp.task('clean', ['sass', 'clean-assets']);

gulp.task('clean-assets', function(cb) {
  conn.rmdir('/assets/', cb)
});

// Default Task
gulp.task('default', ['sass-lint', 'sass', 'watch']);
