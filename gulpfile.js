var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    clean = require('gulp-clean'),
    cssnano = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug'),
    less = require('gulp-less'),
    path = require('path');


gulp.task('scripts', function (done) {
    gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'));
    done();
});


gulp.task('images', function () {
    gulp.src('images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});

gulp.task('svg', function () {
    gulp.src('svg/**/*')
        .pipe(svgmin())
        .pipe(gulp.dest('build/svg'));
});

gulp.task('clean', function () {
    return gulp.src('build/', {read: false, allowEmpty: true})
        .pipe(clean());
});

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: './build/'
        },
        port: 3000,
        host: 'localhost',
        logPrefix: 'frontend',
        open: true
    });
});

gulp.task('templates', function buildHTML() {
    return gulp.src('./templates/pages/*.pug')
        .pipe(pug({
            pretty: true
        }).on('error', function(error) {
            console.log(error);
        }))
        .pipe(gulp.dest('build'));
});


gulp.task('css', function () {
    gulp.src('css/**/*')
        .pipe(gulp.dest('build/css'));
});

gulp.task('less', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('./less/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(concat('styles.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function() {
    gulp.watch('./js/**/*.js', gulp.series('scripts'));
    gulp.watch('./less/*.less', gulp.series('less'));
    gulp.watch('./templates/**/*.pug', gulp.series('templates'));
    gulp.watch(['./images/**/*.jpg', './images/**/*.png'], gulp.series('images'));
    gulp.watch('./**/*.svg', gulp.series('svg'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'images', 'svg', 'less', 'css', 'templates', 'browser-sync', 'watch')));




