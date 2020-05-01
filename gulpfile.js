const { src, dest, watch, series, parallel } = require('gulp');
const path = require('path'),
    pug = require('gulp-pug'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    browsersync = require('browser-sync');

/*
 * Directories here
 */
const paths = {
    app: './src/',
    dist: './dist/',
    pug: '/src/views/',
    sass: './src/styles/',
    css: './dist/styles/'
};

function views() {
    return src([paths.pug + '*.pug', paths.pug + 'pages/*.pug'])
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(dest(paths.dist))
}

function style() {
    return (
        src(paths.sass + 'main.scss')
        .pipe(sourcemaps.init())
        // Stay live and reload on error
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass()
                .on('error', function (err) {
                    console.log(err.message);
                    // sass.logError
                    this.emit('end');
                })
        )
        .pipe(prefix(['last 3 versions', '> 1%'], {
            cascade: true
        }))
        .pipe(csscomb())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.css))
    );
}

function script() {
    return src(paths.app + '*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest(path.dist + 'js/'))
}

function fonts() {
    return src(paths.app + 'fonts/**/*.*')
        .pipe(dest(paths.dist + 'fonts/'));
}

function images() {
    return src([paths.app + 'images/*.*', paths.app + 'images/**/*.*'])
        .pipe(dest(paths.dist + 'images/'));
}

function browserSync() {
    browsersync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
}

function watchFiles() {
    watch(
        [paths.pug + '*.pug', paths.pug + '**/*.pug', paths.pug + '**/**/*.pug'],
        { events: 'all', ignoreInitial: false },
        series(views)
    );
    watch(
        [paths.sass + '*.scss', paths.sass + '**/*.scss', paths.sass + '**/**/*.scss'],
        { events: 'all', ignoreInitial: false },
        series(style)
    );
    watch(
        paths.app + '*.js',
        { events: 'all', ignoreInitial: false },
        series(script)
    );
    watch(
        [paths.app + 'images/*.*', paths.app + 'images/**/*.*'],
        { events: 'all', ignoreInitial: false },
        series(images())
    );
}

exports.views = views;
exports.style = style;
exports.script = script;
exports.fonts = fonts;
exports.images = images;
exports.watch = watchFiles;
exports.build = series(views, fonts, images, style, script);
exports.default = parallel(browserSync, watchFiles);
