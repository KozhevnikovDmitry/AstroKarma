var mongo = require("./mongo");
var async = require("async");

async.series([
    open,
    dropDb,
    requireModels,
    insertPersons
], function (err, res) {
    if(err) throw err;
    console.log(res);
    mongo.disconnect();
});

function open(callback){
    mongo.connection.on('open', callback);
}

function dropDb(callback) {
    mongo.connection.db.dropDatabase(callback);
}

function requireModels(callback){
    require('../models/person');
    async.each(Object.keys(mongo.models), function (modelName, callback) {
        mongo.models[modelName].ensureIndexes(callback);
    }, callback);
}

function insertPersons(callback){
    var persons = [
        {
            name:"Ivan",
            surname:"Ivanov",
            position:"Developer",
            email: "ivan.ivanov@astrosoft.ru"
        },
        {
            name:"Petr",
            surname:"Petrov",
            email: "petr.petrov@astrosoft.ru",
            position:"Developer"
        }]

    async.each(persons, function (pers, callback) {
        var person = new mongo.models.Person(pers);
        person.save(function (err, res, aff) {
            callback();
        })},
        callback
    )
}
