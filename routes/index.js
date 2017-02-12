/**
 * Routing
 */
module.exports = function(app){
  "use strict";

    // main page - top by karma
    app.get('/', function(req, res){
        res.render('index', { title: 'Astro Karma'})
    });

    // person page
    app.get('/person', function(req, res){
        res.render('person', { title: 'Astro Karma'})
    });
}