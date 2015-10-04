module.exports = (function(){
  var create =  function(input){
    var parametrized = { token: {} };
    var inputTokenParams = allowOrThrow(input.body, 'TokenRequest');

    parametrized.sessionId = allowOrThrow(input.query, 'sessionid');

    parametrized.token.content = allowOrThrow(inputTokenParams, 'content');
    parametrized.token.maxAge = allowOrThrow(inputTokenParams, 'maxAge');
    parametrized.token.type = allowOrThrow(inputTokenParams, 'type');

    return parametrized;
  };

  var allowOrThrow = function(object, property) {
    if(object[property] !== undefined) {
      return object[property];
    } else {
      throw 'InvalidInput: ' + property + ' is required' ;
    }
  };

  return {
    create: create
  };
})();
