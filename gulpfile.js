const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");

gulp.task("scss", function(done) {
  return (
    gulp
      .src("dev/scss/**/*.scss")

      .pipe(sass())
      .pipe(
        autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
          cascade: true
        })
      )
      // .pipe(cssnano())
      .pipe(gulp.dest("dist/css"))
  );

  done();
});

gulp.watch("dev/scss/**/*.scss", gulp.series("scss"));

gulp.task("default", gulp.series("scss"));
