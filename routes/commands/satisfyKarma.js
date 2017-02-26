var data = require("../../data/index");

module.exports.satisfyKarma = function(req, res, next) {
    "use strict";

    data.satisfyKarma({
            id: req.body.id},
        function(err, karma){
            if(err) next(err);
            res.send(karma);
        });
};
