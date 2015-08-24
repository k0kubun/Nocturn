var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task(
  'compile',
  ['compile-scss']
);

gulp.task(
  'compile-scss',
  function () {
    gulp.src('src/**/*.scss')
      .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
      .pipe(gulp.dest('app'));
  }
)
