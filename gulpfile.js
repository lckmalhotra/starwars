let gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    es = require('event-stream'),
    clean = require('gulp-clean');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./app/**/*.scss", ['clean','sass']).on('change', browserSync.reload);
    gulp.watch("./app/**/*.js", ['index']).on('change', browserSync.reload);
    gulp.watch("./app/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./app/css"))
        .pipe(browserSync.stream());
});

gulp.task('clean', function () {
    return gulp.src('./app/css', {read: false})
        .pipe(clean());
});

gulp.task('index', function () {
    var cssFiles = gulp.src('./app/**/*.css')
        .pipe(stylus());

    gulp.src('./index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(es.merge(
            cssFiles,
            gulp.src('./app/**/*.js', {read: false})
        )))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['index','serve']);