const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', (req, res) => {
  if(!req.session.jwt) {
    return res.status(401).end();
  }
  axios.post(`${process.env.API_URL}/comment`, req.body, {
    headers: {
      'Authorization': `bearer ${req.session.jwt}`
    }
  })
  .then( response => {
    return res.end();
  })
  .catch( err => {
    return res.status(err.response.status).end();
  });
});

module.exports = router;
