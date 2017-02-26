var data = require("../../data/index");

module.exports.setKarmaNote = function(req, res, next) {
    "use strict";

    data.setKarmaNote({
            id: req.body.id,
            note: req.body.note},
        function(err, karma){
            if(err) next(err);
            res.send(karma);
        });
};
