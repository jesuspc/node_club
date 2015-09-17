var box = (function() {
  var defined = {};
  var memoized = {};

  var let = function(name, generator){
    defined[name] = generator;
  };

  var get = function(name) {
    memoized_elm = memoized[name];
    
    if(!!memoized_elm) {
      return memoized_elm;
    } else {
      obj = defined[name]();
      memoized[name] = obj;
      return obj;
    };
  };

  let('mmdbPath', function(){ return './GeoLite2-Country.mmdb' });

  let('mmdbConnection', function(){
    var MMDBReader = require('mmdb-reader');
    return new MMDBReader(get('mmdbPath'));
  });

  let('mmdbAdapter', function(){
    var mmdbAdapter = require('./lib/adapters/mmdb');
    return mmdbAdapter({
      connection: get('mmdbConnection')
    });
  });

  let('countriesCollection', function(){
    var countriesCollection = require('./lib/countries/collection');
    return countriesCollection({
      adapter: get('mmdbAdapter')
    });
  })

  let('countriesApi', function(){
    var countriesApi = require('./lib/countries/api');
    return countriesApi({
      collection: get('countriesCollection')
    });
  });

  return {
    persistence: {
      mmdb: {
        connection: function() { return get('mmdbConnection') },
        path: function() { return get('mmdbPath') }
      }
    },
    adapters: {
      mmdb: function() { return get('mmdbAdapter') },
      external: {

      }
    },
    countries: {
      collection: function() { return get('countriesCollection') },
      api: function() { return get('countriesApi') }
    }
  };
})();

module.exports = box;