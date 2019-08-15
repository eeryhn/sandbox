const express = require('express');
const router  = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');

// starting to appreciate the "returning" method...also this just sucks.
// uh.....idk.  No more callback hell? idunnoiduncareanymore.
router.put('/register', async (req, res) => {
  const { name, email, reg_code } = req.body.data;
  var { password } = req.body.data;

  try {
    // check signup code + email
    if(!reg_code) return res.status(401).send('No signup code provided');
    const code = await knex.table('signup_codes').first('code_id').whereNull('user_id').andWhere('code', reg_code);
    if(!code) {
      return res.status(401).send('Invalid code ):');
    }
    let user = await knex.table('users').first('user_id').where('email', email);
    if(user) {
      return res.status(403).send('Email already in use.');
    }

    // create user
    password = bcrypt.hashSync(password, parseInt(process.env.SALT));
    await knex('users').insert({name: name, email: email, password: password});
    user = await knex.table('users').first('user_id', 'name').where('email', email);
    await knex('signup_codes').where('code_id', code.code_id).update('user_id', user.user_id);
    user = JSON.parse(JSON.stringify(user));
    const token = jwt.sign(user, process.env.JWT_KEY);
    return res.json({user, token});
  } catch ( err ) {
    console.log('REGISTRATION ERROR: ', err);
  }

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
      const token = jwt.sign(user, process.env.JWT_KEY);
      return res.json({user, token});
    })(req, res, next);
  });

module.exports = router;
