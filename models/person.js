var mongo = require('../data/mongo'),
    Schema = mongo.Schema;

var KarmaSchema = new Schema({
    positive : {
        type: Boolean,
        required: true
    },
    stamp : {
        type: Date,
        required: true
    },
    note : {
        type: String,
        required: false
    },
    satisfy : {
        type: Boolean,
        required: true
    },
    satisfyStamp : {
        type: Date,
        required: false
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "Person"
    }
});
var PersonSchema = new Schema({
        name : {
            type: String,
            required: true
        },
        surname : {
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
        },
        karmas : [KarmaSchema]
    });

var Person = mongo.model("Person", PersonSchema, 'Person')
var Karma = mongo.model("Karma", KarmaSchema, 'Karma');

module.exports.Person = Person;
module.exports.Karma = Karma;

