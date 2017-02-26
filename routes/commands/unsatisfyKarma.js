var data = require("../../data/index");

module.exports.unsatisfyKarma = function(req, res, next) {
    "use strict";

    data.unsatisfyKarma({
            id: req.body.id},
        function(err, karma){
            if(err) next(err);
            res.send(karma);
        });
};
