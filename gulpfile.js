var babelify = require('babelify');
var browserify = require('browserify')
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var gulpif = require('gulp-if');
var minifyCSS = require('gulp-csso');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var sync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var bulkSass = require('gulp-sass-bulk-import');
var merge = require('merge-stream');

var isProd = process.env.NODE_ENV === 'production';

var option = {};

option.base = 'dist';

option.build = {};
option.build.pug = 'src/views/**/';
option.build.img = 'src/assets/images/**/*';
option.build.font = 'src/assets/fonts/**/*';

option.build.scss = {};
option.build.scss.base = 'src/source/scss/';
option.build.scss.path = 'src/source/scss/app.scss';
option.build.scss.file = 'app.scss';

option.build.js = {};
option.build.js.base = 'src/source/javascript/';
option.build.js.path = 'src/source/javascript/index.js';
option.build.js.file = 'index.js';

option.dist = {};
option.dist.css = {};
option.dist.css.path = option.base + '/styles';

option.dist.js = {};
option.dist.js.path = option.base + '/javascript';

option.dist.img = {};
option.dist.img.path = option.base + '/image';

option.dist.font = {};
option.dist.font.path = option.base + '/fonts';

option.babel = {};
option.babel.preset = 'es2015';



/**
 * PUG
 */

function templates() {
  return gulp.src(`${option.build.pug}*.pug`)
    .pipe(pug())
    .pipe(gulp.dest(`${option.base}/`))
    .pipe(sync.stream());
}


/**
 * SCSS
 */

function scss() {

  return gulp.src(option.build.scss.path)
  .pipe(bulkSass())
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(gulpif(!isProd, sourcemaps.init()))
  .pipe(sass())
  .pipe(gulpif(isProd, minifyCSS()))
  .pipe(gulpif(!isProd, sourcemaps.write('.')))
  .pipe(gulp.dest(option.dist.css.path))
  .pipe(sync.stream());
}

/**
 * JS
 */

function js() {
  return browserify({entries: [option.build.js.path], debug: false})
    .transform(babelify, {presets: option.babel.preset})
    .bundle()
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(source(option.build.js.file))
    .pipe(buffer())
    .pipe(gulpif(!isProd, sourcemaps.init({loadMaps: true})))
    .pipe(uglify())
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(option.dist.js.path))
    .pipe(sync.stream());
};

/**
 * IMAGES
 */

function images() {
  return gulp.src(option.build.img)
    .pipe(plumber({
       errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulpif(isProd, imagemin({verbose: true})))
    .pipe(gulp.dest(option.dist.img.path));
}

/**
 * FONTS
 */

function fonts() {
  return gulp.src(option.build.font)
    .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulp.dest(option.dist.font.path));
}

/**
 * GLOBAL
 */

function clean() {
  return del([option.base]);
}


gulp.task('build', gulp.series(clean, gulp.parallel(templates, scss, js, images, fonts)));

gulp.task('default', gulp.parallel(templates, scss, js, images, fonts, function(done) {
  sync.init({
    server: {
      baseDir: `./${option.base}/`
    }
  });

  gulp.watch(`${option.build.pug}*.pug`, templates);
  gulp.watch(`${option.build.scss.base}/**`, scss);
  gulp.watch(`${option.build.js.base}*.js`, js);

  done();
}));

