var collection = function(opts) {
  var adapter = opts.adapter;

  var find = function(host) {
    adapter.where({host: host})[0];
  };

  return {
    find: find
  };
};

module.exports = collection;
