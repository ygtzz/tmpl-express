var gulp = require('gulp');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');

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
    console.log('task start...');
    nodemon({
        script: './bin/www',
        ignore: ["gulpfile.js", "node_modules/", "public/**/*.*"],
        env: { 'NODE_ENV': 'development' }
    }).on('start', function() { 
           
    });
});