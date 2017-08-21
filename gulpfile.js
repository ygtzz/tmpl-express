var gulp = require('gulp');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var base = './app';

gulp.task('default',['dev:watch','dev:nodemon']);
gulp.task('build',function (cb) {
    runSequence('build:clean_build', 'build:usemin','build:move_app','build:clean_app',
    ['build:movejs','build:movecss','build:moveviews'],'build:clean',cb);
});

gulp.task('dev:nodemon', function() {
    console.log('nodemon start...');
    nodemon({
        script: base + '/bin/www',
        // ignore: ["gulpfile.js", "node_modules/", "app/public/**/*.*"],
        env: { 'NODE_ENV': 'development' }
    }).on('start', function() { 
        browserSync.init({ 
            proxy: 'http://localhost:3000', 
            files: ["app/public/**/*.*", "app/views/**", "app/routes/**"], 
            port:8080 
        }, function() { 
            console.log("browsersync start..."); 
        });
    });
});

gulp.task('dev:watch', function() {
    gulp.watch('src/**/*.ejs', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        if (event.type == 'changed') {
            gulp.src(event.path)
                .pipe(gulp.dest(base + '/views'));
        }
    });

    gulp.watch('src/!(routes)/*.js', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        if (event.type == 'changed') {
            gulp.src(event.path)
                .pipe(gulp.dest(base + '/public/js'));
        }
    });

    gulp.watch('src/**/*.{less,css}', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        if (event.type == 'changed') {
            gulp.src(event.path)
                .pipe(less())
                .pipe(gulp.dest(base + '/public/css'));
        }
    });

    gulp.watch('src/routes/*.js', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        if (event.type == 'changed') {
            gulp.src(event.path)
                .pipe(gulp.dest(base + '/routes'));
        }
    });
});

gulp.task('build:clean_build',function(){
    return gulp.src('./build').pipe(clean());
});

gulp.task('build:usemin', function() {
  return gulp.src('./app/views/*.ejs')
    .pipe(usemin({
      assetsDir:'./app/public',
      css: [ rev() ],
    //   html: [ htmlmin({ collapseWhitespace: true }) ],
      js: [ uglify(), rev() ]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('build:move_app', function() {
    return gulp.src('./app/**').pipe(gulp.dest('build'));
});

gulp.task('build:clean_app',function(){
    return gulp.src('./build/public/**/*.{js,css}').pipe(clean());
});

gulp.task('build:movejs', function() {
    return gulp.src('./build/js/*.js').pipe(gulp.dest('build/public/js'));
});

gulp.task('build:movecss', function() {
    return gulp.src('./build/css/*.css').pipe(gulp.dest('build/public/css'));
});

gulp.task('build:moveviews',function(){
    return gulp.src('./build/*.ejs').pipe(gulp.dest('build/views'));
});

gulp.task('build:clean',function(){
    return gulp.src(['./build/+(css|js)','./build/*.ejs']).pipe(clean());
});