/**
 * Data access service
 */

var mongo = require("./mongo");
var Person = require("../models/person").Person;
var Karma = require("../models/person").Karma;

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
            res.surname = person.surname;
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
 * Get person by id
 * @param id of person
 * @param callback
 */
function getPerson(id, callback){
    "use strict";
    Person.findById(id, function (err, res) {
        if(err) throw err;
        callback(null, res);
    })
}

/**
 *  Get all persons
 */
function getPersons(callback){
    "use strict";
    Person.find(callback);
}

/**
 * Set karma to person
 * @param positive, true if karma is positive
 * @param note, author comment to karma
 * @param targetId, id of target person
 * @param authorId, id of author person
 * @param callback
 */
function setKarma(positive, note, targetId, authorId, callback){
    "use strict";
    getPerson(targetId, function (err, target) {
        if(err) throw err;

        if(!target){
            throw Error('No such target person');
        }

        getPerson(authorId, function (err, author){
            if(err) throw err;

            if(!author){
                throw Error('No such author person');
            }

            var karma = new Karma({
                positive: positive,
                stamp: Date.now(),
                note: note,
                authorId: author.id,
                satisfy: false
            });

            target.karmas.push(karma);
            target.save(function (err, res, aff) {
                if(err) throw err;
                callback();
            });
        })
    })
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
    addPerson : addPerson,
    getPerson : getPerson,
    getPersons : getPersons,
    setKarma : setKarma,
    removeKarma : removeKarma
};


