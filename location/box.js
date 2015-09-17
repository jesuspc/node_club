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

  var serve = function(name) {
    return function(){ return get(name) }
  }

  var boxer = {
    router: serve('router'),
    repos: {
      mmdb: {
        connection: serve('mmdbConnection'),
        path: serve('mmdbPath')
      }
    },
    adapters: {
      mmdb: serve('mmdbAdapter'),
      external: {

      }
    },
    countries: {
      collection: serve('countriesCollection'),
      api: serve('countriesApi')
    }
  };

  let('router', function(){
    var express = require('express');
    return express.Router();
  });

  let('mmdbPath', function(){ return './GeoLite2-Country.mmdb' });

  let('mmdbConnection', function(){
    var MMDBReader = require('mmdb-reader');
    return new MMDBReader(boxer.repos.mmdb.path());
  });

  let('mmdbAdapter', function(){
    var mmdbAdapter = require('./lib/adapters/mmdb');
    return mmdbAdapter({
      connection: boxer.repos.mmdb.connection()
    });
  });

  let('countriesCollection', function(){
    var countriesCollection = require('./lib/countries/collection');
    return countriesCollection({
      adapter: boxer.adapters.mmdb()
    });
  })

  let('countriesApi', function(){
    var countriesApi = require('./lib/countries/api');
    return countriesApi({
      collection: boxer.countries.collection(),
      router: boxer.router()
    });
  });

  return boxer;
})();

module.exports = box;