var data = require("../data");
var config = require("../util/config");
var passport = require('passport');
var WindowsStrategy = require('passport-windowsauth');
passport.use(new WindowsStrategy({
    ldap: config.ldapConnection,
    integrated:      false
}, function(profile, done){
    data.authPerson(profile.emails[0].value.toLowerCase(), function (err, person) {
        done(err, person);
    });
}));



module.exports = {
    login : passport.authenticate('WindowsAuthentication', {
                                  successRedirect: '/',
                                  failureRedirect: '/login',
                                  failureFlash: true })
}