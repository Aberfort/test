const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('js', () => {
    return gulp.src('./js/form.js')
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js'));
});

gulp.task('default', gulp.series('js'));