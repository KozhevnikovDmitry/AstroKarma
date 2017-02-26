var data = require("../data");
var config = require("../util/config");
var passport = require('passport');
var WindowsStrategy = require('passport-windowsauth');
var conn = config.get("ldapConnection");
passport.use(new WindowsStrategy({
    ldap: conn,
    integrated: false
}, function(profile, done){
    if(profile) {
        data.authPerson(profile.emails[0].value.toLowerCase(), function (err, person) {
        done(err, person);
    })} else{
        throw new Error("User is not authentificated");
    };
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    data.getPerson(id, function(err, user) {
        done(err, user);
    });
});

module.exports.login = function(req, res, next) {




    passport.authenticate('WindowsAuthentication', { session: true })

    (req, req, function(err, user, info) {
        if(err) next(err);
        if(req.user){
            req.session.save(function(err) {
                if (err) { return next(err); }
                return res.send({ success : true, message : 'Login success', user: req.user });
            });
        } else {
            res.status(401).send("User is not authentificated");
        };}
    )
}

//module.exports.login = passport.authenticate('WindowsAuthentication', { session: true });