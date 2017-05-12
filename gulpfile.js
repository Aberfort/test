const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('js', () => {
    return gulp.src('./landings/shared/src/*.js')
    .pipe(babel({
        presets: ['es2015', 'stage-0']
    }))
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./landings/shared'));
});

gulp.task('default', gulp.series('js'));