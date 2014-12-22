var gulp = require('gulp'),
	del = require('del'),
	concat = require('gulp-concat'),
	// rename = require('gulp-rename'),
	// sass = require('gulp-sass'),
	// mocha = require('gulp-mocha'),
	// istanbul = require('gulp-istanbul'),
	sourcemaps = require('gulp-sourcemaps'),
	// uglify = require('gulp-uglify'),
	// plato = require('gulp-plato'),
	nodemon = require('gulp-nodemon');

/***********
 * Helpers *
 ***********/
gulp.task('env:test', function() {
	process.env.NODE_ENV = 'test';
});

/*******
 * CSS *
 *******/
// gulp.task('sass', function() {
// 	gulp.src([
// 			'public/sass/**/*.scss'
// 		])
// 		.pipe(sass())
// 		.pipe(gulp.dest('public/styles'));
//
// 	gulp.src([
// 			'public/modules/**/*.scss'
// 		])
// 		.pipe(sass())
// 		.pipe(rename(function(path) {
// 			path.dirname = path.dirname.replace('sass', 'styles');
// 		}))
// 		.pipe(gulp.dest('public/modules/'));
// });

/**************
 * JavaScript *
 **************/
gulp.task('concat', function() {
	del.sync('public/app.js');

	return gulp.src([
			'public/lib/angular/angular.min.js',
			'public/lib/angular-aria/angular-aria.min.js',
			'public/lib/angular-animate/angular-animate.min.js',
			'public/lib/hammerjs/hammer.min.js',
			'public/lib/angular-material/angular-material.min.js',
			'public/lib/angular-resource/angular-resource.min.js',
			'public/lib/angular-ui-router/release/angular-ui-router.min.js',
			'public/modules/app.js',
			'public/modules/**/*.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('public'))
		// .pipe(uglify())
		// .pipe(rename('app.min.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public'));
});

/*********
 * Tests *
 *********/
// gulp.task('mocha', function() {
// 	gulp.src(['app/**/*.js', 'config/**/*.js', 'public/modules/**/*.js'])
// 		.pipe(istanbul())
// 		.on('finish', function() {
//
// 			var server = require('./server');
//
// 			return gulp.src('./test/**/*.js')
// 				.pipe(mocha({
// 					// reporter: 'mocha-lcov-reporter'
// 				}))
// 				.pipe(istanbul.writeReports())
// 				.once('end', function() {
// 					server.kill();
// 				});
// 		});
// });

/************
 * Analysis *
 ************/
// gulp.task('plato', function() {
// 	return plato.inspect([
// 			'app/**/*.js',
// 			'config/**/*.js',
// 			'public/modules/**/*.js'
// 		],
// 		'report', {
// 			jshint: {},
// 			complexity: {
// 				trycatch: true
// 			}
// 		});
// });
//
// gulp.task('analysis', gulp.parallel('plato'));

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
		.on('change', gulp.parallel('sass', 'concat'));
});

/*******************
 * Composite tasks *
 *******************/

/**************
 * Test tasks *
 **************/
// gulp.task('test', gulp.series('env:test', 'mocha'));

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
