var geoLite = function() {

  var load = function(attributes) {
    return {
      language: 'en',
      name: attributes.country.names.en,
      geonameId: attributes.country.geoname_id,
      isoCode: attributes.country.iso_code
    };
  };

  return {
    load: load
  };
};

module.exports = geoLite;
