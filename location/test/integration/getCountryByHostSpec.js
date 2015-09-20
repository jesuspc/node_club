var assert = require("assert");
var request = require("request");
var app = require("../../app");
var port = 3333;
var base_url = "http://localhost:" + port;

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
    it('returns a 200 with the appropriate body', function(done){
      var host = '24.24.24.24';
      var path = '/countries.json/' + host;
    
      request(base_url + path, function(error, response, body){
        body = JSON.parse(body);
        assert.equal(response.statusCode, 200);
        assert.equal(body.host, host);
        assert.deepEqual(body.country, {
          language: 'en',
          name: 'United States',
          geoname_id: 6252001,
          iso_code: 'US'
        });
        done();
      });
    });
  });

  describe('when the host can not be found', function(){
    it('returns a 200 with the appropriate body', function(done){
      var host = '192.168.1.1';
      var path = '/countries.json/' + host;
   
      request(base_url + path, function(error, response, body){
        body = JSON.parse(body);
        assert.equal(response.statusCode, 200);
        assert.equal(
          body.error, 'The address ' + host + ' is not in the database.'
        );
        assert.equal(body.host, host);
        done();
      }); 
    });
  });
});