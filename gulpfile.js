var gulp   = require('gulp');
var bower  = require('gulp-bower');
var coffee = require('gulp-coffee');
var haml   = require('gulp-haml');
var sass   = require('gulp-ruby-sass');

gulp.task(
  'bower',
  function() {
    bower()
      .pipe(gulp.dest('./bower_components'))
  }
)

gulp.task(
  'compile',
  ['compile-coffee', 'compile-haml', 'compile-scss']
);

gulp.task(
  'compile-coffee',
  function() {
    gulp.src('src/**/*.coffee')
      .pipe(coffee())
      .pipe(gulp.dest('app'));
  }
)

gulp.task(
  'compile-haml',
  function() {
    gulp.src('static/**/*.haml')
      .pipe(haml())
      .pipe(gulp.dest('app'));
  }
)

gulp.task(
  'compile-scss',
  function() {
    sass('static/', {
      style: 'compressed',
      loadPath: [
        './bower_components/bootstrap-sass/assets/stylesheets'
      ]
    }).pipe(gulp.dest('./app'))
  }
);
