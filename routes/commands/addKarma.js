var data = require("../../data/index");

module.exports.addKarma = function(req, res, next) {
    "use strict";

    data.addKarma({
            positive: req.body.positive,
            note: req.body.note,
            authorId: req.body.authorId,
            targetId: req.body.targetId},
        function(err, karma){
            if(err) next(err);
            res.send(karma);
        });
};
