const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('userTracking', () => {
    return gulp.src('./landings/shared/src/UserTracking.js')
    .pipe(babel({
        presets: ['es2015', 'stage-0']
    }))
    .pipe(uglify())
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(gulp.dest('./landings/shared'));
});

gulp.task('country', function(){
    return gulp.src('./landings/shared/src/countryList.js')
    .pipe(babel({
        presets: ['es2015', 'stage-0']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./landings/shared'));
});

gulp.task('default', gulp.series('userTracking','country'));