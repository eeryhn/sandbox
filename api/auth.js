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
                    delete user.password;
                    if(res) {
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
  knex.select('user_id', 'name', 'email').from('users').where('user_id', id)
    .then(user => {
      if(user[0]) {
        done(null, user[0]);
      } else {
        done('Could not find user', null);
      }
    })
    .catch(err => done(err))
});

module.exports = passport;
