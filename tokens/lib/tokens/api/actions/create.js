module.exports = function(opts){
  return function(req, res, next) {
    res.status(201);
    res.json({a: 1});
  };
};
