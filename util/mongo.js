var mongo = require('mongoose');
var config = require('../config')

var uri = config.get("mongoose:uri");
var options = config.get("mongoose:options");

mongo.Promise = global.Promise;
mongo.connect(uri, options);

module.exports = mongo;
