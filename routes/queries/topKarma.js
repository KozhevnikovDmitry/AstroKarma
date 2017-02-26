var data = require("../../data/index");

module.exports.getTopKarma = function(req, res) {
    "use strict";
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(req.params);
    data.getKarmaTop(firstDay, lastDay, parseInt(req.params.page), parseInt(req.params.offset),
        function (err, top) {
            if(err) throw err;
            console.log(top);
            res.send(top)
        });
};
