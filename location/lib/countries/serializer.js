var serializer = function() {

  var asJson = function(country) {
    var countryAttrs = country.attributes;

    return {
      language: countryAttrs.language,
      name: countryAttrs.name,
      geoname_id: countryAttrs.geonameId,
      iso_code: countryAttrs.isoCode
    }
  };

  return {
    asJson: asJson
  };
};

module.exports = serializer;
