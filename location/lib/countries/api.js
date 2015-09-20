var api = function(opts){
  var router = opts.router;
  var collection = opts.collection;
  var serializer = opts.serializer;

  router.get('/countries.json/:host', function(req, res, next) {
    var host = req.params.host;
    var country = collection.find(host);
    
    if(!!country){
      res.json({
        "country" : serializer.asJson(country), 
        "host" : host
      });
    } else {
      res.json({
        "host" : host,
        "error" : "The address " + host + " is not in the database."
      })
    }
  })

  return router;
};

module.exports = api;
