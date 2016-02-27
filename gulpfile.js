var gulp  = require("gulp");
var babel = require("gulp-babel");
var bower = require("gulp-bower");
var haml  = require("gulp-haml");
var sass  = require("gulp-ruby-sass");

gulp.task("bower", function() {
  return bower().pipe(gulp.dest("./bower_components"));
});

gulp.task(
  "compile",
  ["compile-es6", "compile-fonts", "compile-haml", "compile-scss"]
);

gulp.task("compile-es6", function() {
  return gulp.src("src/**/*.js").pipe(babel({ presets: ['es2015', 'react'], plugins: ['transform-inline-environment-variables'] })).pipe(gulp.dest("app"));
});

gulp.task("compile-fonts", function() {
  return gulp.src("./bower_components/font-awesome/fonts/**.*").pipe(gulp.dest("fonts"));
});

gulp.task("compile-haml", function() {
  return gulp.src("static/**/*.haml").pipe(haml()).pipe(gulp.dest("app"));
});

gulp.task("compile-scss", function() {
  return sass("static/", {
    style: "compressed",

    loadPath: [
      "./bower_components/bootstrap-sass/assets/stylesheets",
      "./bower_components/font-awesome/scss"
    ]
  }).pipe(gulp.dest("./app"));
});
