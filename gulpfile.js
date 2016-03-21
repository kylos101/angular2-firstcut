var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'), // lets you use bleeding edge JS...today!
    webserver = require('gulp-webserver'),
    ts = require('gulp-typescript'),
    merge = require('merge2')        
    ;
    
var tsProject = ts.createProject('tsconfig.json'); // get some typescript settings

gulp.slurped = false;

// run development task
gulp.task('dev', ['watch', 'serve']);

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
    gulp.slurped = true;    
  }       
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/systemjs/dist/system-csp-production.src.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/angular2/bundles/angular2.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/es6-shim/es6-shim.map'
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
    .pipe(ts());;        
 
	return merge([		
		tsResult.dts.pipe(gulp.dest('release/definitions')),
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
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'))
});

// run init tasks
gulp.task('default', ['dependencies', 'ts', 'js', 'html', 'css']);
