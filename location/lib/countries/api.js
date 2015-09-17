var api = function(opts){
  var express = require('express');
  var router = express.Router();
  var collection = opts.collection;

  router.get('/countries.json/:host', function(req, res, next) {
    var host = req.params.host;
    var country = collection.find(host);

    if(!!country){
      res.json({"country" : country, "host" : host});
    } else {
      res.json({
        "host" : host,
        "error" : "The address" + host + "is not in the database."
      })
    }
  })

  return router;
};

module.exports = api;
