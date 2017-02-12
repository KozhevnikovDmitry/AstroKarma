/**
 * Mongoose data provider
 */
var mongo = require('mongoose');
var config = require('../util/config')

var uri = config.get("mongoose:uri");
var options = config.get("mongoose:options");

mongo.Promise = global.Promise;
mongo.connect(uri, options);

module.exports = mongo;
