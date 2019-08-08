require('dotenv').config();

const express = require('express');
const session = require('express-session');
const uid = require('uid-safe');
const passport = require('./auth');

const port = process.env.PORT || 3002;
const dev = process.env.NODE_ENV !== 'production';

const app = express();

app.use(session({
  secret: uid.sync(18),
  cookie: {
    maxAge: 604800 * 1000,
    secure: !dev
  },
  resave: false,
  rolling: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');

app.use('/', userRoutes);
app.use('/comment', commentRoutes);

app.get("/ping", (req, res) => {
  res.json({ "msg": "pong" })
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
