var express = require('express');
var request = require('request');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// api call
var options = { method: 'GET',
  url: 'https://api.yelp.com/v3/businesses/search',
  qs:
   { term: 'restaurant',
     location: 'boulder',
     Authorization: 'Bearer puhMNmwirFRkJjgjE5HmamkAg171rBt4ExNURU7fFSJwudbCGpaJSAv_QxnKs05rj9jMYk4S9OxSUO0CNsfaOo2XKAdvZ3ap-13Oul-OUT7s_sS5nrTT3qZGbbvmWXYx' },
  headers:
   { 'postman-token': '3e877574-ecff-5282-2190-08e9c0eba9b5',
     'cache-control': 'no-cache',
     authorization: 'Bearer puhMNmwirFRkJjgjE5HmamkAg171rBt4ExNURU7fFSJwudbCGpaJSAv_QxnKs05rj9jMYk4S9OxSUO0CNsfaOo2XKAdvZ3ap-13Oul-OUT7s_sS5nrTT3qZGbbvmWXYx' } };

app.get('/api', function(req, res){
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});


app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname+'/test.html')
);
});

//
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//
//   console.log(body);
// });

// api call
// app.get('/api', function(req, res){
//   request('apiurl', function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       console.log(body);
//       res.send(body);
//     }
//    });
// });

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
