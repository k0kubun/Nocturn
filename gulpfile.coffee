gulp   = require('gulp')
bower  = require('gulp-bower')
coffee = require('gulp-coffee')
haml   = require('gulp-haml')
sass   = require('gulp-ruby-sass')

gulp.task('bower', ->
  bower().pipe(gulp.dest('./bower_components'))
)

gulp.task('compile', ['compile-coffee', 'compile-haml', 'compile-scss'])

gulp.task('compile-coffee', ->
  gulp.src('src/**/*.coffee').pipe(coffee()).pipe(gulp.dest('app'))
)

gulp.task('compile-haml', ->
  gulp.src('static/**/*.haml').pipe(haml()).pipe(gulp.dest('app'))
)

gulp.task('compile-scss', ->
  sass('static/', {
    style: 'compressed',
    loadPath: [
      './bower_components/bootstrap-sass/assets/stylesheets',
    ],
  }).pipe(gulp.dest('./app'))
)
