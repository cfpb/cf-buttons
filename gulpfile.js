var gulp = require('gulp');
var react = require('gulp-react');
var runSequence = require('run-sequence');
var jasmine = require("gulp-jasmine");
var istanbul = require("gulp-istanbul");  

gulp.task('coverage', function(callback) {
  runSequence('build-tmp-js',
              'run-coverage',
              callback);
});

gulp.task('build-tmp-js', function () {
  return gulp.src('src/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('coverage/dist'));
});

gulp.task('run-coverage', function(callback) {
  gulp.src('coverage/dist/*.js')
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['spec/*.js'])
        .pipe(jasmine())
        .pipe(istanbul.writeReports())
        .on('end', callback);
    })
});
