"use strict";
/**
 * Application entry point
 */

// npm modules
var path = require('path');
var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var ejs = require('ejs');
var passport = require('passport');

// custom modules
var routes = require('./routes');
var config = require('config');
var log = require('log')(module);

// web server
var app = express();
app.set('port', config.get('port'));
http.createServer(app).listen(app.get('port'), function () {
    log.info('Listen to port ' + config.get('port'));
})

// middleware
app.use(favicon(__dirname + '/public/dist/img/favicon.ico'));
app.use(cookieparser(config.get('session-secret')));
app.use(bodyparser.json());
app.use(session({secret: config.get('session-secret'),
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }}));

// authentification
app.use(passport.initialize());
app.use(passport.session());

// routing and static
app.use(express.static(path.join(__dirname, 'public/dist')))
app.set('views', path.join(__dirname, 'public/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
routes(app);

module.exports = app;
