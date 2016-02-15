import browserify from 'browserify';
import browserSync from 'browser-sync';
import duration from 'gulp-duration';
import gulp from 'gulp';
import hmr from 'browserify-hmr';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import notifier from 'node-notifier';
import path from 'path';
import prefix from 'gulp-autoprefixer';
import rev from 'gulp-rev';
import source from 'vinyl-source-stream';
import exorcist from 'exorcist';
import transform from 'vinyl-transform';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';
import watchify from 'watchify';
import watch from 'gulp-watch';
import inject from 'gulp-inject';
import add from 'gulp-add';

// eslint "no-process-env":0
const production = process.env.NODE_ENV === 'production';

const CONFIG = require('./config.js');
const paths = {
  "source":"./src",
  "destination":"./build",
  "scripts":{
    "source":"./src/index.js",
    "destination":"./build/js/",
    "extensions": ['.jsx'],
    "filename":"bundle.js"
  },
  "templates":{
    "source":"./src/*.html",
    "watch":"./src/*.html",
    "destination":"./build/",
    "revision":"./build/**/*.html"
  },
  "styles":{
    "source":"./src/index.scss",
    "watch":"./src/**/*.scss",
    "destination":"./build/css/",
    "filename":"style.css",
    "browserVersions":[
      "last 2 versions",
      "Chrome 34",
      "Firefox 28",
      "iOS 7"
    ]
  },
  "assets":{
    "source":"./src/assets/**/*.*",
    "watch":"./src/assets/**/*.*",
    "destination":"./build/"
  },
  "inject":{
    "resources":[
      "./build/**/*.css",
      "./build/**/*.js"
    ]
  }
};

const browserifyConfig = {
  entries: [paths.scripts.source],
  extensions: paths.scripts.extensions,
  debug: !production,
  cache: {},
  packageCache: {}
};

function handleError(err) {
  gutil.log(err.message);
  gutil.beep();
  notifier.notify({
    title: 'Compile Error',
    message: err.message
  });
  return this.emit('end');
}

gulp.task('scripts', () => {
  let pipeline = browserify(browserifyConfig)
    .bundle()
    .on('error', handleError)
    .pipe(source(paths.scripts.filename));

  if(production) {
    pipeline = pipeline
      .pipe(streamify(uglify()))
      .pipe(streamify(rev()));
  } else {
    pipeline = pipeline.pipe(transform(() => {
      return exorcist(path.join(paths.scripts.destination, paths.scripts.filename) + '.map');
    }));
  }

  return pipeline.pipe(gulp.dest(paths.scripts.destination));
});

gulp.task('templates', ['styles', 'scripts'], () => {
  const resources = gulp.src(paths.inject.resources, {read: false});

  const pipeline = gulp.src(paths.templates.source)
  .on('error', handleError)
  .pipe(inject(resources, {ignorePath: 'build', removeTags: true}))
  .pipe(gulp.dest(paths.templates.destination));

  if(production) {
    return pipeline;
  }

  return pipeline.pipe(browserSync.reload({
    stream: true
  }));
});


/*
 * Compile to CSS
 */

function createModifyVars(vars) {
  var str = Object.keys(vars).map(function (varName) {
    return '$' + varName + ':\'' + vars[varName] + '\';';
  }).join('\n');
  return str || '';
}

var header = require('gulp-header');

gulp.task('styles', () => {
  console.log(createModifyVars({
      ASSET_PATH: CONFIG.ASSET_PATH
    }));
  let pipeline = gulp
    .src(paths.styles.source)
    .pipe(header(createModifyVars({
      ASSET_PATH: CONFIG.ASSET_PATH
    }), true))

  if(!production) {
    pipeline = pipeline.pipe(sourcemaps.init());
  }

  pipeline = pipeline.pipe(sass({
    outputStyle: production ? 'compressed' : 'nested'
  }))
  .on('error', handleError)
  .pipe(prefix(paths.styles.browserVersions))
  .pipe(concat(paths.styles.filename));

  if(production) {
    pipeline = pipeline.pipe(rev());
  } else {
    pipeline = pipeline.pipe(sourcemaps.write('.'));
  }

  pipeline = pipeline.pipe(gulp.dest(paths.styles.destination));

  if(production) {
    return pipeline;
  }

  return pipeline.pipe(browserSync.stream({
    match: '**/*.css'
  }));
});

gulp.task('assets', () => {
  return gulp.src(paths.assets.source)
    .pipe(gulp.dest(paths.assets.destination));
});

gulp.task('server', () => {
  return browserSync({
    open: false,
    port: 9001,
    notify: false,
    ghostMode: false,
    server: {
      baseDir: paths.destination
    }
  });
});

gulp.task('watch', () => {

  ['templates', 'styles', 'assets'].forEach((watched) => {
    watch(paths[watched].watch, () => {
      gulp.start(watched);
    });
  });

  const bundle = watchify(browserify(browserifyConfig).plugin(hmr));

  bundle.on('update', () => {
    const build = bundle.bundle()
      .on('error', handleError)
      .pipe(source(paths.scripts.filename));

    build
    .pipe(transform(() => {
      return exorcist(paths.scripts.destination + paths.scripts.filename + '.map');
    }))
    .pipe(gulp.dest(paths.scripts.destination))
    .pipe(duration('Rebundling browserify bundle'));
  }).emit('update');
});

gulp.task('build', ['styles', 'assets', 'scripts', 'templates']);
gulp.task('default', ['styles', 'assets', 'templates', 'watch', 'server']);
