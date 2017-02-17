var mongo = require('../data/mongo'),
    Schema = mongo.Schema;

var PersonSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    surname : {
        type: String,
        required: true
    },
    nameRu : {
        type: String,
        required: true
    },
    surnameRu : {
        type: String,
        required: true
    },
    position : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    }
});

var Person = mongo.model("Person", PersonSchema, 'Person')

module.exports.Person = Person;

