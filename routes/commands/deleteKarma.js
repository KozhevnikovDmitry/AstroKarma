var data = require("../../data/index");

module.exports.deleteKarma = function(req, res) {
    "use strict";
    data.removeKarma({
            id: req.params.id},
        function(err, karma){
            if(err) throw err
            res.send(karma);
        });
};