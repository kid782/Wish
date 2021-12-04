// list dependencies
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();
const gulpStylelint = require("gulp-stylelint");

//create functions

//scss
function compilescss() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}
//js
function jsmin() {
  return gulp.src("js/*.js").pipe(terser()).pipe(gulp.dest("./dist/js"));
}

// create watchtask
function watchTask() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./scss/**/*.scss", compilescss);
  gulp.watch("./js/**/*.js", jsmin);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

//default-gulp
exports.compilescss = compilescss;
exports.jsmin = jsmin;
exports.watchTask = watchTask;
