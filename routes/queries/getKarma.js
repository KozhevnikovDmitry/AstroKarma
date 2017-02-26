var data = require("../../data/index");

module.exports.getKarma = function(req, res) {
    "use strict";
    data.getKarma(req.params.id, function (err, karma, next) {
        if(err) next(err);
        res.send(karma);
    });
};