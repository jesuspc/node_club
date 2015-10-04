var boxer = require('./boxer')();
var box = require('./box')(boxer);

module.exports = box.app();
