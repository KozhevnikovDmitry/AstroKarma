/**
 * Config util for config.json
 */
var nconf = require('nconf');
var path = require('path');

nconf.argv()
     .env('_')
     .file({ file: path.join(__dirname, 'config.json')})

module.exports = nconf;

