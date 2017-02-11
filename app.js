"use strict";
var express = require('express');
var bodyparser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var http = require('http');
var config = require('config');
var log = require('util/log')(module);
var createDb = require('util/createDb');

var app = express();
app.set('port', config.get('port'));

http.createServer(app).listen(app.get('port'), function () {
    log.info('Listen to port ' + config.get('port'));
})

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index', { title: 'Astro Karma'})
});
app.get('/person', function(req, res){
    res.render('person', { title: 'Astro Karma'})
});

module.exports = app;
