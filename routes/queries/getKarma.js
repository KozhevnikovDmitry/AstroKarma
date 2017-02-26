var data = require("../../data/index");

module.exports.getKarma = function(req, res, next) {
    "use strict";
    data.getKarma(req.params.id, function (err, karma) {
        if(err) next(err);
        res.send(karma);
    });
};