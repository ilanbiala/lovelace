var gulp = require('gulp'),
	del = require('del'),
	concat = require('gulp-concat'),
	// rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	// uglify = require('gulp-uglify'),
	nodemon = require('gulp-nodemon');

/**************
 * JavaScript *
 **************/
gulp.task('concat', function() {
	del.sync('public/app.js');

	return gulp.src([
			'public/lib/angular/angular.min.js',
			'public/lib/angular-aria/angular-aria.min.js',
			'public/lib/angular-animate/angular-animate.min.js',
			'public/lib/angular-material/angular-material.min.js',
			'public/lib/angular-resource/angular-resource.min.js',
			'public/lib/angular-ui-router/release/angular-ui-router.min.js',
			'public/modules/app.js',
			'public/modules/**/*.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('public'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public'));
});

/*****************
 * Development   *
 *****************/
gulp.task('watch', function() {
	gulp
		.watch(['public/**/*.js', '!public/*.js'], {}, ['concat'])
		.on('change', function(event) {
			console.log('File %s was %s, running tasks...', event.path, event.type);
		});

	gulp
		.watch('public/**/*.scss', {}, ['sass'])
		.on('change', function(event) {
			console.log('File %s was %s, running tasks...', event.path, event.type);
		});
});

gulp.task('nodemon', function() {
	return nodemon({
			script: 'server.js',
			ext: 'js',
			ignore: [
				'node_modules/',
				'coverage/',
				'report/',
				'test/',
				'public/lib/',
				'gulpfile.js'
			]
		})
		.on('change', gulp.parallel('concat'));
});

/*******************
 * Composite tasks *
 *******************/

/*********************
 * Development tasks *
 *********************/
gulp.task('dev', gulp.parallel('concat'));

/**********************
 * Production tasks   *
 **********************/
gulp.task('build', gulp.parallel('concat'));

gulp.task('default', function() {
	// place code for your default task here
});
