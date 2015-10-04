module.exports = function(opts){
  var transaction = opts.createTransaction;
  var parametrizer = opts.parametrizer;

  return function(req, res, next) {
    var params = parametrizer.create(req);
    var created = transaction(params.token);

    res.status(201);
    res.json(null);
  };
};
