const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');

gulp.task('js', () => {
  return gulp.src('./src/js/*.js')
  .pipe(babel({
    presets: ['es2015', 'stage-0']
  }))
  .pipe(uglify())
  .pipe(concat('bundle.min.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return gulp.src('./src/stylus/*.styl')
  .pipe(stylus({
    compress: true
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('track', () => {
  return gulp.src('./src/js/UserTracking.js')
  .pipe(babel({
    presets: ['es2015', 'stage-0']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('js', 'styles'));