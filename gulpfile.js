const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('userTracking', () => {
    return gulp.src('./landings/shared/src/UserTracking.js')
    .pipe(babel({
        presets: ['es2015', 'stage-0']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./landings/shared'));
});

gulp.task('default', gulp.series('userTracking'));