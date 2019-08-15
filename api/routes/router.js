const express = require('express');
const router  = express.Router();

const userRoutes = require('./users');
const commentRoutes = require('./comments');

router.use('/', userRoutes);
router.use('/comment', commentRoutes);

router.get("/ping", (req, res) => {
  res.json({ "msg": "pong" })
});

module.exports = router;
