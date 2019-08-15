require('dotenv').config();

const express = require('express');
const passport = require('./auth');

const port = process.env.PORT || 3002;
const dev = process.env.NODE_ENV !== 'production';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

const router = require('./routes/router');

if(dev) {
  app.use('/', router);
} else {
  app.use(process.env.SANDBOX_API_EXT, router);
}

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
