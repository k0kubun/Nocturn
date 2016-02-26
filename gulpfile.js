var gulp = require("gulp");
var babel = require("gulp-babel");
var bower = require("gulp-bower");
var coffee = require("gulp-coffee");
var haml = require("gulp-haml");
var sass = require("gulp-ruby-sass");

gulp.task("bower", function() {
  return bower().pipe(gulp.dest("./bower_components"));
});

gulp.task(
  "compile",
  ["compile-es6", "compile-coffee", "compile-fonts", "compile-haml", "compile-scss"]
);

gulp.task("compile-es6", function() {
  return gulp.src("src/**/*.js").pipe(babel()).pipe(gulp.dest("app"));
});

gulp.task("compile-coffee", function() {
  return gulp.src("src/**/*.coffee").pipe(coffee()).pipe(gulp.dest("app"));
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
