const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const knex = require('./db/knex.js');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function (email, password, done) {
      return knex.select('user_id', 'name', 'password').from('users').where('email', email)
         .then(users => {
           if(!users[0]) {
             return done(null, false, {message: 'Incorrect email or password.'});
           }
           const user = JSON.parse(JSON.stringify(users[0]));
           bcrypt.compare(password, user.password)
            .then(function(res) {
              delete user.password;
              if(res) {
                return done(null, user, {message: 'Logged In Successfully'});
              } else {
                return done(null, false, {message: 'Incorrect email or password.'});
              }
            });
        })
        .catch(err => done(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
    jsonWebTokenOptions: {
      maxAge: '3d'
    }
  },
  function(jwtPayload, done) {
    return done(null, jwtPayload);
  }
))

module.exports = passport;
