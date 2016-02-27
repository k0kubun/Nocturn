const gulp  = require('gulp');
const babel = require('gulp-babel');
const bower = require('gulp-bower');
const haml  = require('gulp-haml');
const sass  = require('gulp-ruby-sass');

gulp.task('bower', () => {
  return bower().
    pipe(gulp.dest('./bower_components'));
});

gulp.task(
  'compile',
  [
    'compile-es6',
    'compile-fonts',
    'compile-haml',
    'compile-scss',
  ]
);

gulp.task('compile-es6', () => {
  return gulp.
    src('src/**/*.js').
    pipe(
      babel({
        presets: ['es2015', 'react'],
        plugins: ['transform-inline-environment-variables'],
      })
    ).
    pipe(gulp.dest('app'));
});

gulp.task('compile-fonts', () => {
  return gulp.
    src('./bower_components/font-awesome/fonts/**.*').
    pipe(gulp.dest('fonts'));
});

gulp.task('compile-haml', () => {
  return gulp.
    src('static/**/*.haml').
    pipe(haml()).
    pipe(gulp.dest('app'));
});

gulp.task('compile-scss', () => {
  return sass('static/', {
    style: 'compressed',
    loadPath: [
      './bower_components/bootstrap-sass/assets/stylesheets',
      './bower_components/font-awesome/scss'
    ]
  }).pipe(gulp.dest('./app'));
});
