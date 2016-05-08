var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'), // lets you use bleeding edge JS...today!
    webserver = require('gulp-webserver'),
    ts = require('gulp-typescript'),
    merge = require('merge2'),
    del = require('del')
    ;

var tsProject = ts.createProject('tsconfig.json'); // get some typescript settings

gulp.slurped = false;

// run development task
gulp.task('dev', ['default', 'watch']);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
// updated to watch gulp file via http://codepen.io/ScavaJripter/post/how-to-watch-the-same-gulpfile-js-with-gulp
// updated to watch dependencies and typescript
gulp.task('watch', function () {
  if (!gulp.slurped)
  {
    gulp.watch('gulpfile.js', ['default']);
    gulp.watch('tsconfig.json', ['default']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.ts', ['ts']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch('src/**/*.jpg', ['images']);
    gulp.watch('src/**/*.png', ['images']);
    gulp.watch('src/**/*.gif', ['images']);
    gulp.slurped = true;
  }
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/systemjs/dist/system.js.map',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/systemjs/dist/system-polyfills.js.map',

    'node_modules/systemjs/dist/system-csp-production.js',
    'node_modules/systemjs/dist/system-csp-production.js.map',

    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/reflect-metadata/Reflect.js.map',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/http.dev.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/rxjs/bundles/Rx.js',

    'node_modules/es5-shim/es5-shim.js',
    'node_modules/es5-shim/es5-shim.js.map',
    'node_modules/es6-shim/es6-shim.js',
    'node_modules/es6-shim/es6-shim.map',

    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/zone.js/dist/long-stack-trace-zone.js',
    'node_modules/es6-promise/dist/es6-promise.min.js',
    'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
    'node_modules/core-js/client/core.js',

    'node_modules/angular2/bundles/router.dev.js'
  ])
    .pipe(gulp.dest('build/lib'));
});

// move ts (this is transpiled in the client; NOT ideal for production)
// gulp.task('ts', function () {
//   return gulp.src('src/app/**/*.ts', { base: './src/app'})
//     .pipe(gulp.dest('build/app'))
// });

// transpile typescript to JS and move the JS
gulp.task('ts', function () {
    var tsResult = gulp.src('src/app/**/*.ts')
    .pipe(ts(tsProject));

	return merge([
		tsResult.dts.pipe(gulp.dest('build/app')),
        tsResult.js.pipe(gulp.dest('build/app'))
	]);
});

// transpile & move js
gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('build'));
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'));
});

// move images
gulp.task('images', function () {
  return gulp.src(['src/**/*.jpg','src/**/*.png','src/**/*.gif'])
    .pipe(gulp.dest('build'));
});

// move bootstrap fonts
gulp.task('fonts', function () {
  return gulp.src('node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('build/fonts/bootstrap'));
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'));
});

// run init tasks
gulp.task('default', ['dependencies', 'images','fonts','ts', 'js', 'html', 'css']);

gulp.task('clean', function () {
  return del([
    //'dist/report.csv',
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'build/**/*',
    // we don't want to clean this file though so we negate the pattern
    //'!dist/mobile/deploy.json'
  ]);
});
