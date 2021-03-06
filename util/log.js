/**
 * Logger util for logging to console
 */
var winston = require("winston");
var ENV = process.env.NODE_ENV;

function getLogger(module){
    "use strict";

    var path = module.filename;

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: ENV === 'development' ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;