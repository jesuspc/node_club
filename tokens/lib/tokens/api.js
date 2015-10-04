var api = function(opts){
  var router = opts.router;

  router.post('/tokens', opts.createAction);

  return router;
};

module.exports = api;
