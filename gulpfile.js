var gulp = require('gulp');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var base = './app';

gulp.watch('src/**/*.ejs', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type == 'changed') {
        gulp.src(event.path)
            .pipe(gulp.dest(base + '/views'));
    }
});

gulp.watch('src/**/*.js', function(event) {
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

gulp.task('default', function() {
    console.log('nodemon start...');
    nodemon({
        script: base + '/bin/www',
        ignore: ["gulpfile.js", "node_modules/", "app/public/**/*.*"],
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