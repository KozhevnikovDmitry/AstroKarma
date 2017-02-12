"use strict";
/**
 * Application entry point
 */

// npm modules
var path = require('path');
var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var favicon = require('serve-favicon');
var ejsLocals = require('ejs-locals');

// custom modules
var routes = require('routes');
var config = require('config');
var log = require('util/log')(module);

// web server
var app = express();
app.set('port', config.get('port'));
http.createServer(app).listen(app.get('port'), function () {
    log.info('Listen to port ' + config.get('port'));
})

// middleware
app.engine('ejs', ejsLocals);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(bodyparser.urlencoded({extended: true}));

// routing
routes(app);
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;
