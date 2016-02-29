var gulp = require('gulp');
var connect = require('gulp-connect-php');
var browserSync = require('browser-sync');

gulp.task('connect-sync', function() {
  connect.server({
  	port: 3000,
  	livereload: true
  }, function (){
    browserSync({
      proxy: '127.0.0.1:3000'
    });
  });

  gulp.watch([
    './*.html',
    './*.js'
    ]
    ).on('change', function () {
    browserSync.reload();
  });
});

gulp.task('default', ['connect-sync']);