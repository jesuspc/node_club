var assert = require("assert");

var subject = (function(){
  var builder = require("../../../lib/countries/collection");
  var adapter = { 
    where: function(query) { 
      if(query.host == 'host') {
        return ['result_1', 'result_2']
      } 
    } 
  };
  var entity = {
    build: function(attributes) { return attributes; }
  }

  return builder({adapter: adapter, entity: entity});
})();

describe('Countries collection', function() {
  describe('#find()', function () {
    it('queries for the host into the adapter and returns the first result', function () {
      assert.equal(subject.find('host'), 'result_1');
    });
  });
});