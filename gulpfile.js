var gulp   = require('gulp');
var coffee = require('gulp-coffee');
var haml   = require('gulp-haml');
var sass   = require('gulp-sass');

gulp.task(
  'compile',
  ['compile-coffee', 'compile-haml', 'compile-scss']
);

gulp.task(
  'compile-coffee',
  function () {
    gulp.src('src/**/*.coffee')
      .pipe(coffee())
      .pipe(gulp.dest('app'));
  }
)

gulp.task(
  'compile-haml',
  function () {
    gulp.src('static/**/*.haml')
      .pipe(haml())
      .pipe(gulp.dest('app'));
  }
)

gulp.task(
  'compile-scss',
  function () {
    gulp.src('static/**/*.scss')
      .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
      .pipe(gulp.dest('app'));
  }
)
