const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const knex = require('./db/knex.js');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        return knex.select('*').from('users').where('email', email)
           .then(user => {
               if (user) {
                 bcrypt.compare(password, user.password)
                  .then(function(res) {
                    if(res) {
                      delete user.password;
                      return done(null, user, {message: 'Logged In Successfully'});
                    } else {
                      return done(null, false, {message: 'Incorrect email or password.'});
                    }
                  });
               } else {
                 return done(null, false, {message: 'Incorrect email or password.'});
               }
          })
          .catch(err => done(err));
    }
));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
  knex.select('*').from('users').where('user_id', id)
    .then(user => {
      if(user) {
        delete user.password;
        done(null, user);
      } else {
        done('Could not find user', user);
      }
    })
    .catch(err => done(err))
});

module.exports = passport;
