/**
 * Routing
 */
module.exports = function(app){
    "use strict";

    // render index.html
    app.get('/', function(req, res){
       res.render('index.html');
    });

    // authentificate user
    //app.post('/login', require("./auth").login);

    // return all karma top by currrent month
    app.get('/person/top/:page/:offset', require("./queries/topKarma").getTopKarma);

    // return person by id with karma by current month
    app.get('/person/:id', require("./queries/personKarma").getPersonKarma);

    // return karma by id
    app.get('/karma/:id', require("./queries/getKarma").getKarma);

    // add person
    app.post('/person/add',  require("./commands/addPerson").addPerson);

    // add karma
    app.post('/karma/add',  require("./commands/addKarma").addKarma);

    // set note to karma
    app.put('/karma/setNote',  require("./commands/setKarmaNote").setKarmaNote);

    // satisfy karma
    app.put('/karma/satisfy',  require("./commands/satisfyKarma").satisfyKarma);

    // unsatisfy karma
    app.put('/karma/unsatisfy', require("./commands/unsatisfyKarma").unsatisfyKarma);

    // remove karma
    app.delete('/karma/remove/:id', require("./commands/deleteKarma").deleteKarma);
}