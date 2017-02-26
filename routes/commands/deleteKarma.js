var data = require("../../data/index");

module.exports.deleteKarma = function(req, res, next) {
    "use strict";
    data.removeKarma({
            id: req.params.id},
        function(err, karma){
            if(err) next(err);
            res.send(karma);
        });
};