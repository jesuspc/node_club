var assert = require("assert");
var http = require('http');
var app = require('../../app');
var port = 3333;
var sessionCookie = null;

var defaultGetOptions = function(path) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "GET",
    "headers": {
      "Cookie": sessionCookie
    }
  };
  return options;
}

var serverUtils = (function(){
  var server;

  return {
    start: function(handler) {
      server = app.listen(port, handler);
    },
    stop: function() {
      server.close();
    }
  }
})();

describe('Get country by host', function(){
  before(function(done){
    serverUtils.start(function(err, result){
      if(err) {
        done(err);
      } else {
        done();
      };
    })
  });

  after(function(done){
    serverUtils.stop();
    done();
  });

  describe('when the host can be found', function(){
    it('returns a 200 with the appropriate body', function(){
      var host = '24.24.24.24';
      var headers = defaultGetOptions('/countries.json/' + host);
    
      var req = http.get(headers, function(res){
        res.setEncoding('utf-8');
        var body = '';
        res.setEncoding('utf-8');
        
        res.on('data', function (data) {
          body += data;
        });
        
        res.on('end', function(){
          body = JSON.parse(body);
          assert.equal(res.statusCode, 200);
          assert.equal(body.host, host);
          req.end();
        });
      });
    });
  });

  describe('when the host can not be found', function(){
    it('returns a 200 with the appropriate body', function(){
      var host = '192.168.1.1';
      var headers = defaultGetOptions('/countries.json/' + host);
    
      var req = http.get(headers, function(res){
        var body = '';
        res.setEncoding('utf-8');
        
        res.on('data', function (data) {
          body += data;
        });
        
        res.on('end', function(){
          body = JSON.parse(body)
          assert.equal(res.statusCode, 200);
          assert.equal(
            body.error, 'The address ' + host + ' is not in the database.'
          );
          assert.equal(body.host, host);
          req.end();
        });
      });
    });
  });
});