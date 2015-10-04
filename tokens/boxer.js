var boxer = (function() {
  var defined = {};
  var memoized = {};

  var set = function(name, generator){
    defined[name] = generator;
  };

  var get = function(name) {
    memoized_elm = memoized[name];

    if(!!memoized_elm) {
      return memoized_elm;
    } else {
      generated = defined[name]();
      memoized[name] = generated;
      return generated;
    }
  };

  var box = function(){
    var accum = {};
    var splitted, serveFunction;
    var delimiter = '.';
    var expandTree = function(prop){
      splitted = prop.split(delimiter);

      buildPropertyTree(splitted, accum, function(){
        return get(prop);
      });
    };

    for (var property in defined) {
      if (defined.hasOwnProperty(property)) { expandTree(property); }
    }
    return accum;
  };

  var buildPropertyTree = function(itinerary, accum, fn){
    var newAccum;
    var key;

    if(itinerary.length == 1){
      accum[itinerary.shift()] = fn;
    } else {
      key = itinerary.shift();
      accum[key] = accum[key] || {};
      buildPropertyTree(itinerary, accum[key], fn);
    }
  };

  return { set: set, get: get, box: box };
})();

module.exports = boxer;

