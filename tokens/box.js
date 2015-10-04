module.exports = function(boxer) {
  var box;

  var express = require('express');
  var path = require('path');
  var bodyParser = require('body-parser');

  boxer.set('middleware.logger', function(){
    var logger = require('morgan');
    return logger('dev');
  });

  boxer.set('middleware.bodyParser.json', function(){
    return bodyParser.json();
  });

  boxer.set('middleware.bodyParser.urlEncoded', function(){
    return bodyParser.urlencoded({ extended: false });
  });

  boxer.set('middleware.publicFiles', function(){
    return express.static(path.join(__dirname, 'public'));
  });

  boxer.set('middleware.cookieParser', function(){
    var cookieParser = require('cookie-parser');
    return cookieParser();
  });

  boxer.set('middleware.errorHandler.notFound', function(){
    return function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    };
  });

  boxer.set('middleware.errorHandler.stackTrace', function(){
    return function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    };
  });

  boxer.set('middleware.errorHandler.silent', function(){
    return function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    };
  });

  boxer.set('tokens.api', function(){
    var api = require('./lib/tokens/api');
    return api({
      router: box.router()
    });
  });

  boxer.set('router', function(){
    var express = require('express');
    return express.Router();
  });

  boxer.set('app', function(){
    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(box.middleware.logger());
    app.use(box.middleware.bodyParser.json());
    app.use(box.middleware.bodyParser.urlEncoded());
    app.use(box.middleware.cookieParser());
    app.use(box.middleware.publicFiles());
    //app.use(box.tokens.api());
    app.use(box.middleware.errorHandler.notFound());

    if(app.get('env') === 'development'){
      app.use(box.middleware.errorHandler.stackTrace());
    } else {
      app.use(box.middleware.errorHandler.silent());
    }

    return app;
  });

  box = boxer.box();

  return box;
};
