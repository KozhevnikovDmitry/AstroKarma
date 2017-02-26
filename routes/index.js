/**
 * Routing
 */
module.exports = function(app){
    "use strict";

    var data = require("../data");
    //var passport = require('passport');
    //var WindowsStrategy = require('passport-windowsauth');
    /*passport.use(new WindowsStrategy({
        ldap: {
            url:             '',
            base:            '',
            bindDN:          '',
            bindCredentials: ''
        },
        integrated:      false
    }, function(profile, done){
        data.authPerson(profile.emails[0].value.toLowerCase(), function (err, person) {
            done(err, person);
        });
    }));*/

    // render index.html
    app.get('/', function(req, res){
       res.render('index.html');
    });

    //app.post('/login',
    //        passport.authenticate('WindowsAuthentication', {
    //            successRedirect: '/',
    //            failureRedirect: '/login',
    //            failureFlash:    true }),
    //        function (req, res) {
    //        res.send("OK")
    //    }
    //);

    // return all karma top by currrent month
    app.get('/person/top/:page/:offset', function(req, res){

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        console.log(req.params);
        data.getKarmaTop(firstDay, lastDay, parseInt(req.params.page), parseInt(req.params.offset),
            function (err, top) {
            if(err) throw err;
            console.log(top);
            res.send(top)
        });
    });

    // return all persons
    app.get('/person', function(req, res){
        data.getPersons(function (err, persons) {
            if(err) throw err;
            console.log(persons);
            res.send(persons)
        });
    });

    // return person by id with karma by current month
    app.get('/person/:id', function(req, res){

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        data.getPerson(req.params.id, firstDay, lastDay, function (err, person) {
            if(err) throw err;
            res.send(person);
        });
    });

    // add person
    app.post('/person/add', function(req, res){
        data.addPerson({
                name: req.body.name,
                nameRu: req.body.nameRu,
                surname: req.body.surname,
                surnameRu: req.body.surnameRu,
                position: req.body.position,
                email: req.body.email },
            function(err, person){
                if(err) throw err
                res.send(person);
            });
    });

    // return karma by id
    app.get('/karma/:id', function(req, res){
        data.getKarma(req.params.id, function (err, karma) {
            if(err) throw err;
            res.send(karma);
        });
    });

    // add karma
    app.post('/karma/add', function(req, res){
        data.addKarma({
                positive: req.body.positive,
                note: req.body.note,
                authorId: req.body.authorId,
                targetId: req.body.targetId},
            function(err, karma){
                if(err) throw err
                res.send(karma);
            });
    });


    // set note to karma
    app.put('/karma/setNote', function(req, res){
        data.setKarmaNote({
                id: req.body.id,
                note: req.body.note},
            function(err, karma){
                if(err) throw err
                res.send(karma);
            });
    });


    // satisfy karma
    app.put('/karma/satisfy', function(req, res){
        data.satisfyKarma({
                id: req.body.id},
            function(err, karma){
                if(err) throw err
                res.send(karma);
            });
    });


    // unsatisfy karma
    app.put('/karma/unsatisfy', function(req, res){
        data.unsatisfyKarma({
                id: req.body.id},
            function(err, karma){
                if(err) throw err
                res.send(karma);
            });
    });

    // remove karma
    app.delete('/karma/remove/:id', function(req, res){
        data.removeKarma({
                id: req.params.id},
            function(err, karma){
                if(err) throw err
                res.send(karma);
            });
    });
}