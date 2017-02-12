/**
 * Routing
 */
module.exports = function(app){
    "use strict";

    var data = require("../data");

    // main page - all persons
    app.get('/', function(req, res){
        data.getPersons(function (err, persons) {
            if(err) throw err;
            console.log(persons);
            res.render('index', { title: 'Astro Karma', persons: persons})
        });
    });

    // person page
    app.get('/person/:id', function(req, res){
        data.getPerson(req.params.id, function (err, person) {
            if(err) throw err;
            res.render('person', { title: 'Astro Karma', person: person});
        });
    });

    // set karma
    app.post('/karma', function(req, res){
        data.setKarma(
            req.body.positive,
            req.body.note,
            req.body.authorId,
            req.body.targetId, function(err, karma){
                if(err) throw err
                res.send(karma);
            });
    });
}