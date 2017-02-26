var data = require("../../data/index");

module.exports.getPersonKarma = function(req, res) {
    "use strict";
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    data.getPersonKarma(req.params.id, firstDay, lastDay, function (err, person) {
        if(err) throw err;
        res.send(person);
    });
};