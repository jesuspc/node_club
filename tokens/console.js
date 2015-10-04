var repl = require("repl");
var boxer = require('./boxer');
var box = require('./box')(boxer);

console.log('>>> Welcome to the Tokens microservice Repl.');
console.log('>>> The box object is available from here.');
r = repl.start("tokens> ");
r.context.box = box;
