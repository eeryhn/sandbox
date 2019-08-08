const express = require('express');
const router  = express.Router();
const passport = require('passport');
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');

router.put('/signup', (req, res) => {
  const { name, email, password } = req.body.data;
  bcrypt.hash(password, parseInt(process.env.SALT))
    .then(function(hash) {
      knex('users').insert({name: name, email: email, password: hash})
        .then(function() {
          knex.select('user_id').from('users').where('email', email)
            .then(function(user) {
              req.login(user[0], function(err) {
                if(err) {
                  console.log(err);
                  return res.json({
                    message: 'Failed to auto-login what ):'
                  })
                }
                return res.json({
                  message: 'Welcome home :)'
                })
              });
            });
        })
        .catch(function(err) {
          console.log(err);
          return res.json({
            message: 'Oops... ):'
          })
        })
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.get("/login",
  function(req, res, next) {
    passport.authenticate('local', function(err, user,info) {
      if(err) {
        return res.json({
          message: 'Oops, something went wrong.'
        });
        console.log('LOGIN ERROR:', err);
      }
      if(!user) {
        return res.json({...info});
      }
      req.login(user, function(err) {
        if(err) { return next(err); }
      })
    })(req, res, next);
  });

router.get('/logout', (req, res) => {
  req.logout();
});

module.exports = router;
