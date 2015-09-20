var assert = require("assert");

var subject = (function(){
  var builder = require("../../../lib/countries/serializer");
  return builder();
})();

describe('Countries serializer', function() {
  describe('#asJson()', function () {
    it('formats the given country as an object ready to be built into JSON', function () {
      var country = {
        attributes: {
          language: 'en',
          name: 'United Kingdom',
          geonameId: 42,
          isoCode: 'UK'
        }
      };
      var serializedCountry = {
        language: 'en',
        name: 'United Kingdom',
        geoname_id: 42,
        iso_code: 'UK'
      };

      assert.deepEqual(subject.asJson(country), serializedCountry);
    });
  });
});