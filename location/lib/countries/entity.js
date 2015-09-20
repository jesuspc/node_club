var entity = function(opts) {
  var mapper = opts.mapper;

  var build = function(attributes) {
    if(!attributes){
      return null;
    } else {
      return mapper.load(attributes);
    };
  };

  return {
    build: build
  };
};

module.exports = entity;
