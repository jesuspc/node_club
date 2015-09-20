var assert = require("assert");

var subject = (function(){
  var mapper = {
    load: function(){ return {loaded: 'loaded'}; }
  };
  var builder = require("../../../lib/countries/entity");
  return builder({mapper: mapper});
})();

describe('Countries entity', function() {
  describe('#build()', function() {
    describe('when no attributes given', function() {
      it('returns null', function(){
        var country = subject.build(false);
        assert.equal(country, null);
      });
    });

    describe('when attributes given', function(){
      it('returns an object that represents the country and responds to attributes with the output of mapper', function(){
        var country = subject.build({some: 'attribute'});
        assert.equal(typeof(country), 'object');
        assert.deepEqual(country.attributes, { loaded: 'loaded' });
      });
    });
  });
});