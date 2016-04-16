var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	browserify = require('browserify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	del = require('del'),
	config = {
		path: {
			dest: './dist',
			src: './src'
		}
	}
	;

// TODO: Add svg sprites

gulp.task('scss', function() {
    gulp.src(config.path.src + '/**/*.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
        .pipe($.sass.sync())
		.pipe($.autoprefixer('last 3 versions'))
		.pipe($.uglifycss())
		.pipe($.rename({suffix:'.min'}))
		.pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(config.path.dest + '/css/'))
        .pipe($.livereload())
		.pipe(reload({stream:true}))
	;
});

gulp.task('build:clean', function(sb){
	return del([config.path.dest + '/**/*'], sb);
});

gulp.task('build:serve', function(){
	browserSync({
		server: {
			baseDir: config.path.dest + '/'
		}
	})
});

gulp.task('js', function() {
	return browserify({ entries: config.path.src + '/main.js', debug: true })
		.bundle()
		.pipe($.plumber())
		.pipe(source('main.js'))
		.pipe($.rename({suffix:'.min'}))
		.pipe(buffer())
		.pipe($.sourcemaps.init({loadMaps: true}))
		.pipe($.uglify())
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(config.path.dest + '/js/'));
});

// Alternative to browserify
gulp.task('js_', function() {
    gulp.src(config.path.src + '/**/*.js')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.concat('main.js'))
		.pipe($.rename({suffix:'.min'}))
        .pipe($.uglify())
		.pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(config.path.dest + '/js/'))
        .pipe($.livereload())
		.pipe(reload({stream:true}))
	;
});

gulp.task('jade', function() {
    gulp.src([config.path.src + '/**/*.jade', '!' + config.path.src + '/**/_*.jade'])
		.pipe($.plumber())
		.pipe($.jadeGlobbing())
        .pipe($.jade({pretty:  true}))
        .pipe(gulp.dest(config.path.dest + '/'))
        .pipe($.livereload())
		.pipe(reload({stream:true}))
	;
});

gulp.task('images', function(){
	return gulp.src(config.path.src + '/img/**')
		.pipe($.imagemin())
		.pipe(gulp.dest(config.path.dest + '/img'));
});

gulp.task('watch', function() {
	$.livereload.listen(8080);

	$.watch(config.path.src + '/**/*.scss', function() {
        gulp.start('scss');
    });

	$.watch(config.path.src + '/**/*.js', function() {
        gulp.start('browserify');
    });

	$.watch(config.path.src + '/**/*.jade', function() {
        gulp.start('jade');
    });

	$.watch(config.path.src + '/img/**', function() {
        gulp.start('images');
    });
});

gulp.task('build', ['scss', 'js', 'jade', 'images', 'build:serve']);
gulp.task('default', ['build', 'watch']);
