const express = require('express');
const router  = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');

router.put('/register', (req, res) => {
  const { name, email, password } = req.body.data;
  bcrypt.hash(password, parseInt(process.env.SALT))
    .then(function(hash) {
      knex('users').insert({name: name, email: email, password: hash})
        .then(function() {
          knex.select('user_id', 'name').from('users').where('email', email)
            .then(function(users) {
              const user = JSON.parse(JSON.stringify(users[0])); // ......TODO: kill...something.
              req.login(user, {session: false}, (err) => {
                if(err) {
                  console.log(err);
                  return res.json({
                    message: 'Failed to auto-login what ):'
                  })
                }
                const token = jwt.sign(user, process.env.JWT_KEY);
                return res.json({user, token});
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

router.post('/login',
  function(req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      console.log(info);
      if (err || !user) {
        return res.status(400).json({
          message: 'Incorrect email or password',
          user   : user
        });
      }
      req.login(user, {session: false}, (err) => {
        if (err) {
          console.log(err);
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, process.env.JWT_KEY);
        return res.json({user, token});
      });
    })(req, res, next);
  });

module.exports = router;
