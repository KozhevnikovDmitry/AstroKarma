var data = require("../../data/index");

module.exports.addPerson = function(req, res, next) {
    "use strict";

    data.addPerson({
            name: req.body.name.trim(),
            nameRu: req.body.nameRu.trim(),
            surname: req.body.surname.trim(),
            surnameRu: req.body.surnameRu.trim(),
            position: req.body.position.trim(),
            email: req.body.email.toLowerCase().trim() },
        function(err, person){
            if(err) next(err);
            res.send(person);
        });
};
