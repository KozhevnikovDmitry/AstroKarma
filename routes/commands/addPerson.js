var data = require("../../data/index");

module.exports.addPerson = function(req, res, next) {
    "use strict";

    data.addPerson({
            name: req.body.name,
            nameRu: req.body.nameRu,
            surname: req.body.surname,
            surnameRu: req.body.surnameRu,
            position: req.body.position,
            email: req.body.email },
        function(err, person){
            if(err) next(err);
            res.send(person);
        });
};
