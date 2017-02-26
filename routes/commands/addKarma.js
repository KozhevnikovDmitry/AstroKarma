var data = require("../../data/index");

module.exports.addKarma = function(req, res) {
    "use strict";

    data.addKarma({
            positive: req.body.positive,
            note: req.body.note,
            authorId: req.body.authorId,
            targetId: req.body.targetId},
        function(err, karma){
            if(err) throw err
            res.send(karma);
        });
};
