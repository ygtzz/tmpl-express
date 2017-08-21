var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var winston = require('winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression');
var env = process.env.NODE_ENV || 'development';
require('./app-bootstrap');

var app = express();

//use gzip
app.use(compression({
  threshold: 512
}));
//启用CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:7000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
}));
// Use winston on production
var log = 'dev';
if (env !== 'development') {
  log = {
    stream: {
      write: message => winston.info(message)
    }
  };
}
// Don't log during tests
// Logging middleware
if (env !== 'test') app.use(morgan(log));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置上传目录
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

//加载route
var routes = require('./route');
routes.forEach(item => {
  app.use(item.name,require(item.path));
});
//基于文件名加载所有route
var routePath = path.join(__dirname, '/routes');
fs.readdirSync(routePath)
  .filter(file => ~file.search(/^[^\.].*\.js$/) && routes.every(item => item.path + '.js' != './routes/'+file))
  .forEach(file => {
    var name = path.basename(file,'.js');
    app.use('/'+name,require('./routes/' + name))
  });
//load auth
app.use('/api/auth',require('./auth'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
