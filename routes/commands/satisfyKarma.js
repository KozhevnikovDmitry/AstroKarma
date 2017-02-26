var data = require("../../data/index");

module.exports.satisfyKarma = function(req, res) {
    "use strict";

    data.satisfyKarma({
            id: req.body.id},
        function(err, karma){
            if(err) throw err
            res.send(karma);
        });
};
