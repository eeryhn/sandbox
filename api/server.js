require('dotenv').config();

const express = require('express');
const passport = require('./auth');

const port = process.env.PORT || 3002;
const dev = process.env.NODE_ENV !== 'production';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');

app.use(passport.initialize());

app.use('/', userRoutes);
app.use('/comment', commentRoutes);

app.get("/ping", (req, res) => {
  res.json({ "msg": "pong" })
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
