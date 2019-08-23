const gulp = require('gulp'),

    // Style-related plugins
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),

    // JavaScript-related plugins
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel');

// Image optimization plugins
imagemin = require('gulp-imagemin'),
    svgo = require('imagemin-svgo'),
    mozjpeg = require('imagemin-mozjpeg'),
    pngquant = require('imagemin-pngquant'),

    // Utility plugins
    newer = require('gulp-newer'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),

    // Browsery Sync
    browsersync = require('browser-sync'),
    reload = browsersync.reload;

const styles = {
    source: './source/scss/app.scss',
    destination: './dist/css',
    sassOptions: {
        outputStyle: 'compact',
        precision: 10,
        sourceComments: true
    },
    prefixes: ['last 2 versions', 'ie >= 10'],
    cleancssOptions: {
        level: {
            2: {
                all: false,
                mergeMedia: true,
                restructureRules: true,
                removeDuplicateMediaBlocks: true
            }
        }
    }
};

const scripts = {
    vendor: {
        source: './source/js/vendor/**/*.js',
        filename: 'vendor'
    },
    custom: {
        source: './source/js/custom/main.js',
        filename: 'app'
    },
    destination: './dist/js'
};

const images = {
    source: './source/img/**/*',
    destination: './dist/img',
    imageminPlugins: [
        mozjpeg({
            quality: 85
        }),
        pngquant({
            speed: 1
        }),
        svgo()
    ],
    imageminOptions: {
        verbose: true
    }
};

const watchFiles = {
    html: '**/*.html',
    css: 'source/css/**/*.css',
    scss: 'source/scss/**/*.scss',
    jsVendor: 'source/js/vendor/**/*.js',
    jsCustom: 'source/js/custom/**/*.js',
    images: 'source/img/**/*'
};

// Browser Sync task
gulp.task('browser-sync', function () {
    browsersync.init({
        proxy: 'http://dev.bmacd.me',
        open: true,
        injectChanges: true
    });
});

// Styles-related tasks
gulp.task('styles', function () {
    gulp.src(styles.source)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass(styles.sassOptions))
        .pipe(autoprefixer(styles.prefixes))
        .pipe(gulp.dest(styles.destination))
        .pipe(rename({
            basename: 'styles',
            suffix: '.min'
        }))
        .pipe(cleancss(styles.cleancssOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(styles.destination))
        .pipe(plumber.stop())
        .pipe(browsersync.stream());
});

// JavaScript-related tasks
gulp.task('jsVendor', function () {
    return gulp.src(scripts.vendor.source)
        .pipe(concat(scripts.vendor.filename + '.js'))
        .pipe(gulp.dest(scripts.destination))
        .pipe(rename({
            basename: scripts.vendor.filename,
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(scripts.destination));
});
gulp.task('jsCustom', function () {
    return gulp.src(scripts.custom.source)
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(sourcemaps.init())
        .pipe(concat(scripts.custom.filename + '.js'))
        .pipe(gulp.dest(scripts.destination))
        .pipe(rename({
            basename: scripts.custom.filename,
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(scripts.destination));
});
gulp.task('watch-jsVendor', ['jsVendor'], function (done) {
    browsersync.reload();
    done();
});
gulp.task('watch-jsCustom', ['jsCustom'], function (done) {
    browsersync.reload();
    done();
});

// Image optimization
gulp.task('imageOptimization', function () {
    return gulp.src(images.source)
        .pipe(newer(images.destination))
        .pipe(imagemin(images.imageminPlugins, images.imageminOptions))
        .pipe(gulp.dest(images.destination));
});
gulp.task('watch-imageOptimization', ['imageOptimization'], function (done) {
    browsersync.reload();
    done();
});

gulp.task('build', ['styles', 'jsCustom', 'jsVendor', 'imageOptimization']);

// Default task
gulp.task('default', ['styles', 'jsCustom', 'jsVendor', 'imageOptimization'], function () {
    gulp.watch(watchFiles.html, reload);
    gulp.watch(watchFiles.scss, ['styles']);
    gulp.watch(watchFiles.jsVendor, ['watch-jsVendor']);
    gulp.watch(watchFiles.jsCustom, ['watch-jsCustom']);
    gulp.watch(watchFiles.images, ['watch-imageOptimization']);
});
