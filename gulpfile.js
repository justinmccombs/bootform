var gulp = require('gulp');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var minify = require('gulp-minify');

gulp.task('js', function () {
    return gulp.src('src/bootform.js')
        .pipe(uglify())
        .pipe(minify())
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'Finished minifying JavaScript'}));
});

gulp.task('default', function () {
    gulp.run('js');
});