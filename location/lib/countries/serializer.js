var serializer = function() {

  var as_json = function(country) {
    return {
      language: country.language,
      name: country.name,
      geoname_id: country.geonameId,
      iso_code: country.isoCode
    }
  };

  return {
    as_json: as_json
  };
};

module.exports = serializer;
