const gulp = require('gulp')
const less = require('gulp-less')

gulp.task('compile-less', function () {
  return gulp.src('./index.less')
    .pipe(less())
    .pipe(gulp.dest('./index.css'))
})

gulp.task('watch', function () {
  gulp.watch('./index.less', gulp.series('compile-less'))
})

gulp.task('default', gulp.series('compile-less', 'watch'))
