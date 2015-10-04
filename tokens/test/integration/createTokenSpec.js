var assert = require('assert');
var request = require('supertest');

var app = require('../../app');

describe('[INTEGRATION] Create Token', function(){
  describe('when successful authorization and valid params', function(){
    var sessionId = '';
    var tokenContent = 'some content';
    var tokenMaxAge = 1000;
    var tokenType = 'token';
    var tokenData = {
      content: tokenContent,
      maxAge: tokenMaxAge,
      type: tokenType
    };
    var doRequest = function() {
      return request(app)
        .post('/tokens')
        .query({sessionid: sessionId})
        .send(tokenData)
        .set('Accept', 'application/json');
    };

    it('responds with 201', function(done){
      doRequest()
        .expect('Content-Type', /json/)
        .expect(201, done);
    });

    it('creates a token', function(){
    });

    it('returns the created token location in the location header', function(){
    });
  });
});
