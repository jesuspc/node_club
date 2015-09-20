var assert = require("assert");

var subject = (function(){
  var builder = require("../../../../lib/countries/mappers/geoLite2");

  return builder();
})();

describe('Countries collection', function() {
  describe('#load()', function () {
    it('extracts a valid entity attributes data structure from an arbitrary Geolite mmdb input', function () {
      var input = {
        someKey: 'a',
        country: {
          someKey: 'b',
          names: {
            en: 'United Kingdom'
          },
          geoname_id: 42,
          iso_code: 'UK'
        }
      };
      var output = {
        language: 'en',
        name: 'United Kingdom',
        geonameId: 42,
        isoCode: 'UK'
      };
      assert.deepEqual(subject.load(input), output);
    });
  });
});