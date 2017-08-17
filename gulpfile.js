var gulp = require('gulp');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.watch('src/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type == 'changed') {
        gulp.src(event.path)
            .pipe(gulp.dest('./public/js'));
    }
});

gulp.watch('src/**/*.less', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    if (event.type == 'changed') {
        gulp.src(event.path)
            .pipe(less())
            .pipe(gulp.dest('./public/css'));
    }
});

gulp.task('default', function() {
    console.log('nodemon start...');
    nodemon({
        script: './bin/www',
        ignore: ["gulpfile.js", "node_modules/", "public/**/*.*"],
        env: { 'NODE_ENV': 'development' }
    }).on('start', function() { 
        browserSync.init({ 
            proxy: 'http://localhost:3000', 
            files: ["public/**/*.*", "views/**", "routes/**"], 
            port:8080 
        }, function() { 
            console.log("browsersync start..."); 
        });
    });
});