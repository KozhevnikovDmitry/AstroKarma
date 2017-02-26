var data = require("../../data/index");

module.exports.unsatisfyKarma = function(req, res) {
    "use strict";

    data.unsatisfyKarma({
            id: req.body.id},
        function(err, karma){
            if(err) throw err
            res.send(karma);
        });
};
