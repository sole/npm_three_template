var path = require('path');
var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var youKnowWhat = require('you-know-what');

var buildDir = path.join(__dirname, 'build');
var srcDir = path.join(__dirname, 'src');

gulp.task('build', ['build-src']);

gulp.task('build-src', ['build-static-js', 'build-static-html', 'build-static-css', 'build-static-data']);

gulp.task('build-static-js', function() {
	return youKnowWhat({
			entries: path.join(srcDir, 'js/main.js'),
			debug: true,
			transform: []
		},
		'bundle.js'
	)
	.pipe(gulp.dest(path.join(buildDir, 'js')));
});

gulp.task('build-static-html', function() {
	return gulp.src([
		path.join(srcDir, 'index.html')
	]).pipe(gulp.dest(buildDir));
});

gulp.task('build-static-css', function() {
	return gulp.src([
		path.join(srcDir, 'css/style.css')
	]).pipe(gulp.dest(path.join(buildDir, 'css')));
});

gulp.task('build-static-data', function() {
	return gulp.src(path.join(srcDir, 'data/**/*'))
		.pipe(gulp.dest(path.join(buildDir, 'data')));
});

gulp.task('watch', function () {
    watch(path.join(srcDir, '**/*'), batch(function(events, done) {
        gulp.start('build', done);
    }));
});

gulp.task('default', ['build', 'watch']);
