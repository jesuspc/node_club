var collection = function(opts) {
  var adapter = opts.adapter;
  var entity = opts.entity;

  var find = function(host) {
    attributes = adapter.where({host: host})[0]
    return entity.build(attributes);
  };

  return {
    find: find
  };
};

module.exports = collection;
