var mongo = require('../util/mongo'),
    Schema = mongo.Schema;

var schema = new Schema(
    {
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
        }
    }
);

exports.User = mongo.model("Person", schema)

