const express = require('express');
const axios = require('axios');

const router = express.Router();

router.put('/register', (req, res) => {
  axios.put(`${process.env.API_URL}/register`, req.body)
    .then( response => {
      req.session.jwt = response.data.token;
      req.session.user = response.data.user;
      return(res.json(response.data.user));
    })
    .catch( err => {
      console.log(err.response.data);
      res.status(err.response.status).send(err.response.data);
    });
});

router.post('/login', (req, res) => {
  axios.post(`${process.env.API_URL}/login`, req.body)
    .then( response => {
      req.session.jwt = response.data.token;
      req.session.user = response.data.user;
      return(res.json({user: response.data.user}));
    })
    .catch( err => {
      if(err.response.status === 400) {
        return res.status(400).json(err.response.data);
      }
    });
});

router.post('/logout', (req, res) => {
  // REVIEW: something's wrong.  First request after logout throws out a syntax
  //         error.  Something about clearing out store incorrectly, possibly, maybe idk.
  req.session.destroy( err => {
    if(err) {
      return res.status(400).json('oops ):');
    }
    return res.end();
  });
});

module.exports = router;
