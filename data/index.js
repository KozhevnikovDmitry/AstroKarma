/**
 * Data access service
 */

var mongo = require("./mongo");
var Person = require("../models/person").Person;
var Karma = require("../models/karma").Karma;
ObjectID = require('mongodb').ObjectID;

/**
 * Get person by email
 * @param email
 * @param callback
 */
function authPerson(email, callback){
    "use strict";
    Person.aggregate([{$match: {email : {$eq : email}}}, {$limit : 1}], function (err, res) {
        if(err) throw err;
        callback(null, res[0]);
    });
}

/**
 * Return top of karma by month
 * @param from - from this date
 * @param to - to this date
 * @param page - size of page
 * @param offset - offset in cursor
 * @param callback
 */
function getKarmaTop(from, to, page, offset, callback){
    "use strict";
    Karma.aggregate([{$match: {stamp : {$gte: from, $lte: to}}},
                     {$group:{_id: "$targetId",
                              positive: { $sum : { $cond: { if: { $eq: [ "$positive", true ] }, then: 1, else: 0 } } },
                              negative: { $sum : { $cond: { if: { $eq: [ "$positive", false ] }, then: 1, else: 0 } } },
                             }},
                     {$sort: {positive: -1}},
                     {$lookup:
                        {
                            from: "Person",
                            localField: "_id",
                            foreignField: "_id",
                            as: "persons"
                        }},
                     {$project:{
                        positive:1,
                        negative:1,
                        person: { $arrayElemAt: [ "$persons", 0 ] },
                     }},
                     {$limit: page},
                     {$skip: page*offset}
        ], function (err, top){

        if(err) throw err;
        callback(null, top)
    })
}

/**
 * Get person by id with karma by month
 * @param id of person
 * @param from - join karma from this date
 * @param to - join karm to this date
 * @param callback
 */
function getPersonKarma(id, from, to, callback){
    "use strict";
    Person.aggregate([{$match:{_id: {$eq: new ObjectID(id)}}}],

        function (err, res) {
            if(err) throw err;

            Karma.aggregate([{$match:{ $and: [{targetId: {$eq: new ObjectID(id)}}, {stamp : {$gte: from, $lte: to} }]}}],
                function (err, karmas) {
                    if(err) throw err;
                    res[0].karmas = karmas;
                    callback(null, res[0]);
                })
        })
}

/**
 * Get karma
 * @param id of karma
 * @param callback
 */
function getKarma(id, callback){
    "use strict";

    Karma.aggregate([{$match:{_id: {$eq: new ObjectID(id)}}},
        {$limit: 1},
        {$lookup:{
            from: "Person",
            localField: "targetId",
            foreignField: "_id",
            as: "target"
        }},
        {$lookup:{
            from: "Person",
            localField: "authorId",
            foreignField: "_id",
            as: "author"
        }},
        {$project:{
            positive:1,
            stamp:1,
            note:1,
            satisfy:1,
            satisfyStamp:1,
            authorId:1,
            targetId:1,
            target: { $arrayElemAt: [ "$target", 0 ] },
            author: { $arrayElemAt: [ "$author", 0 ] },
        }}], function(err, res) {
        callback(null, res[0]);
    });
}

/**
 * Add or update person by email
 * @param person
 * @param callback
 */
function addPerson(person, callback){
    "use strict";
    Person.findOne({email: person.email}, function (err, res) {
        if(err) throw err;
        if(res){
            res.name = person.name;
            res.nameRu = person.nameRu;
            res.surname = person.surname;
            res.surnameRu = person.surnameRu;
            res.position = person.position;
            res.save(callback);
        }
        else
        {
            var newPerson = new Person(person);
            newPerson.save(callback);
        }
    })
}


/**
 *  Get all persons
 */
function getPersons(callback){
    "use strict";
    Person.find(callback);
}

function getPerson(id, callback){
    "use strict";
    Person.findById(id, callback);
}


/**
 * Add karma to person
 * @param positive, true if karma is positive
 * @param note, author comment to karma
 * @param targetId, id of target person
 * @param authorId, id of author person
 * @param callback
 */
function addKarma(karma, callback){
    "use strict";
    Person.findById(karma.targetId, function (err, target) {
        if(err) throw err;

        if(!target){
            throw Error('No such target person');
        }

        Person.findById(karma.authorId, function (err, author){
            if(err) throw err;

            if(!author){
                throw Error('No such author person');
            }

            var karmaModel = new Karma({
                positive: karma.positive,
                stamp: Date.now(),
                note: karma.note,
                authorId: karma.authorId,
                targetId: karma.targetId,
                satisfy: false
            });

            karmaModel.save(callback);
        })
    })
}

/**
 * Satisfy karma
 * @param karma data
 * @param callback
 */
function satisfyKarma(karma, callback)
{
    "use strict";
    Karma.findById(karma.id, function (err, karmaModel) {
        if(err) throw err;

        karmaModel.satisfy = true;
        karmaModel.satisfyStamp = Date.now();
        karmaModel.save(callback);
    });
}

/**
 * Unsatisfy karma
 * @param karma data
 * @param callback
 */
function unsatisfyKarma(karma, callback)
{
    "use strict";
    Karma.findById(karma.id, function (err, karmaModel) {
        if(err) throw err;

        karmaModel.satisfy = false;
        karmaModel.satisfyStamp = null;
        karmaModel.save(callback);
    });
}

/**
 * Set note to karma
 * @param karma data
 * @param callback
 */
function setKarmaNote(karma, callback)
{
    "use strict";
    Karma.findById(karma.id, function (err, karmaModel) {
        if(err) throw err;

        karmaModel.note = karma.note
        karmaModel.save(callback);
    });
}

/**
 * Remove karma by id
 * @param id
 * @param callback
 */
function removeKarma(id, callback){
    "use strict";
    Karma.remove({id: id}, callback);
}

module.exports = {
    authPerson : authPerson,
    getPerson: getPerson,
    getKarmaTop : getKarmaTop,
    addPerson : addPerson,
    getPersonKarma : getPersonKarma,
    getPersons : getPersons,
    getKarma : getKarma,
    addKarma : addKarma,
    removeKarma : removeKarma,
    setKarmaNote : setKarmaNote,
    satisfyKarma : satisfyKarma,
    unsatisfyKarma : unsatisfyKarma
};


