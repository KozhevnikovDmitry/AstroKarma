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
        ref: "Person",
        required: true
    },
    targetId: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        required: true
    }
});

var Karma = mongo.model("Karma", KarmaSchema, 'Karma');
module.exports.Karma = Karma;
