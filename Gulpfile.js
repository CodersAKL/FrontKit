var
    gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    browserify  = require('browserify'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    del         = require('del'),
    config      = {
        path: {
            dest: './dist',
            src: './src'
        }
    },
    timer = 0
;

// TODO: Add svg sprites

gulp.task('scss', function () {
    return gulp.src(config.path.src + '/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync())
        .pipe($.autoprefixer('last 3 versions'))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(config.path.dest + '/css/'))
        .pipe(browserSync.stream({match: '**/*.css'}))
    ;
});

gulp.task('build:clean', function (sb) {
    console.log('deleted');
    return del([config.path.dest + '/**/*'], sb);
});

gulp.task('build:serve', function () {
    var files = [
        'css/**/*.css',
        'js/**/*.js'
    ];
    browserSync.init(files, {
        server: config.path.dest
    })
});

gulp.task('js', function () {
    return gulp.src([config.path.src + '/main.js'])
        .pipe($.browserify({debug: true,insertGlobals: true}))
        .pipe(gulp.dest(config.path.dest + '/js/'))
        .pipe(reload({stream: true}))
    ;
});

gulp.task('lint_js', function() {
    return gulp.src([config.path.src + '/**/*.js'])
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
    ;
});

gulp.task('lint_jade', function() {
    return gulp.src([config.path.src + '/**/*.jade'])
        .pipe($.plumber())
        .pipe($.jadelint({ 'HTMLRootRequiresLang': 'ignore' }))
    ;
});

gulp.task('lint_scss', function() {
    return gulp.src([config.path.src + '/**/*.s+(a|c)ss'])
        .pipe($.sassLint())
        .pipe($.sassLint.format())
        .pipe($.sassLint.failOnError())
    ;
});

// Alternative to browserify
gulp.task('js_', function () {
    return gulp.src(config.path.src + '/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.concat('main.js'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(config.path.dest + '/js/'))
        .pipe(reload({stream: true}))
    ;
});

gulp.task('jade', function () {
    return gulp.src([config.path.src + '/**/*.jade', '!' + config.path.src + '/**/_*.jade'])
        .pipe($.plumber())
        .pipe($.jadeGlobbing())
        .pipe($.jade({pretty: true}))
        .pipe(gulp.dest(config.path.dest + '/'))
    ;
});

gulp.task('images', function () {
    return gulp.src(config.path.src + '/img/**')
        .pipe($.imagemin())
        .pipe(gulp.dest(config.path.dest + '/img'));
});

gulp.task('watch-all', function () {
    gulp.watch(config.path.src + '/**/*.scss', ['scss']);

    gulp.watch(config.path.src + '/**/*.js', ['js']);

    gulp.watch(config.path.src + '/**/*.jade', ['jade']);

    gulp.watch(config.path.src + '/img/**', ['images']);

    gulp.watch(config.path.dest + '/**/*.html').on('change', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
           reload();
        }, 500);
    });
});

gulp.task('build', ['build:clean', 'lint_scss', 'scss', 'lint_js', 'js', 'lint_jade', 'jade', 'images']);
gulp.task('default', ['build']);
gulp.task('watch', ['build:serve', 'watch-all']);
