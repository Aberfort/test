const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');

gulp.task('userTracking', () => {
    return gulp.src('./landings/shared/src/UserTracking.js')
    .pipe(babel({
        presets: ['es2015', 'stage-0']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./landings/shared'));
});

gulp.task('clear',function(){
    return del([
        './landings/1/src/js/country.js',
        './landings/2/src/js/country.js',
        './landings/3/src/js/country.js',
        './landings/4/src/js/country.js',
        './landings/5/src/js/country.js'
    ]);
});

gulp.task('country', function() {

    let dests = [
        './landings/1/src/js',
        './landings/2/src/js',
        './landings/3/src/js',
        './landings/4/src/js',
        './landings/5/src/js'
    ];
    let fileUpload = gulp.src('./landings/shared/src/country.js');

    for(let i = 0; i < dests.length; i++){
        fileUpload = fileUpload.pipe(gulp.dest(dests[i]))
    }

    return fileUpload;
});

gulp.task('default', gulp.series('userTracking','clear','country'));