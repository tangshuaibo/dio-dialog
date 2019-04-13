const { task, parallel, watch, src, dest } = require('gulp');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');

// 压缩js
var jsminify = function () {
    return src('./src/**/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(dest('./dist'));
};

// 压缩css
var cssminify = function () {
    return src('./src/**/*.css')
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./dist'));
};

// 文件复制
var filecopy = function () {
    return src([
        './src/**/*.js',
        './src/**/*.css'])
        .pipe(dest('./dist'));
};

// 压缩任务
task('minify', parallel(jsminify, cssminify, filecopy));

// 文件监听
task('watch', function () {
    watch('./src/**', task('minify'));
});