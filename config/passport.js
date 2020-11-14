const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy (
    function(email, password, done) {
        Usuario.findOne({ email: email }, function (err, usuario) {
            if (err) return done(err);
            if (!usuario) return done(null, false, { message: 'Email no existente o incorrecto.' });
            if (!usuario.validPassword(password)) return done(null, false, { message: 'Contaseña incorrecto' });

            return done(null,usuario);
        });
    }
));

passport.serializeUser(function(usuario, cb) {
    cb(null, usuario.id);
});

passport.deserializeUser(function(id, cb) {
    Usuario.findById(id, function(err, usuario) {
        cb(err, usuario);
    });
});

module.exports = passport;