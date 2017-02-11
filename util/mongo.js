var mongo = require('mongoose');
var config = require('../config')

var uri = config.get("mongoose:uri");
var options = config.get("mongoose:options");

mongo.connect(uri, options);

module.exports = mongo;
