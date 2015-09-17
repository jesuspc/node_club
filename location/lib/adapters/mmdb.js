var adapter = function(opts) {
  var connection = opts.connection;

  var where = function(query) {
    return [connection.lookup(query.host)];
  };

  return {
    where: where
  };
};

module.exports = adapter;