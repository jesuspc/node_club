var adapter = function(opts) {
  var connection = opts.connection;

  var where = function(query) {
    [connection.lookup(query.host)];
  };

  return {
    where: where
  };
};

module.exports = adapter;