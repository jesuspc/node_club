var assert = require("assert");

var subject = (function(){
  var builder = require("../../../lib/adapters/mmdb");
  var connection = { lookup: function() { return 'result' } };

  return builder({connection: connection});
})();

describe('Mmdb adapter', function() {
  describe('#where()', function () {
    it('lookups for the host in the query using the connection', function () {
      assert.deepEqual(subject.where({host: 'host'}), ['result']);
    });
  });
});