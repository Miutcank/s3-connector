var gulp = require('gulp');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var plato = require('gulp-plato');
require('gulp-help')(gulp);

gulp.task('test', 'Run all tests.', function runTests(callback) {
    runSequence(
        'lint',
        'test-unit',
        callback
    );
});

gulp.task('test-unit', 'run all unit tests.', function runUnitTests() {
    return gulp.src('./test/unit/**/*.js')
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('lint', 'Lint all js files.', function lintJs() {
    return gulp.src([
        './**/*.js',
        '!./node_modules/**/*.js',
        '!./coverage/**/*.js',
        '!./report/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('coverage', 'Create code coverage reports.', function coverage(callback) {
    runSequence(
        'setup-istanbul',
        'test',
        'report-istanbul',
        callback
    );
});

gulp.task('setup-istanbul', false, function setupIstanbul(callback) {
    gulp.src(['app/**/*.js'])
        .pipe(istanbul())
        .on('finish', callback);
});

gulp.task('report-istanbul', false, function reportIstanbul() {
    return gulp.src(['app/**/*.js'])
        .pipe(istanbul.writeReports({
            dir: './coverage',
            reporters: ['lcovonly', 'html', 'cobertura', 'text']
        }));
});

gulp.task('plato', 'Generate complexity analysis reports', function platoReport() {
    gulp.src(['app/**/*.js'])
        .pipe(plato('report'));
});
