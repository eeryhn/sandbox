const express = require('express');
const compression = require('compression');
const next = require('next');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const uid = require('uid-safe');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comment');

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    server.set('trust proxy', 1);
    const sessionConfig = {
        secret: uid.sync(18),
        cookie: {
          maxAge: 3 * 86400 * 1000,
          secure: !dev
        },
        store: new MemoryStore({
          checkPeriod: 3 * 86400 * 1000
        }),
        resave: false,
        saveUninitialized: false
      };
    server.use(session(sessionConfig));

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    server.use('/auth', authRoutes);
    server.use('/comment', commentRoutes);

    const restrictAccess = (req, res, next) => {
      if(!req.session.jwt) return res.redirect('/');
      next();
    }

    server.use('/signup', (req, res, next) => {
      if(!req.query || !req.query.code) return res.redirect('/');
      next();
    })

    server.use('/comment', restrictAccess);
    // server.use('/cyclic-numbers', restrictAccess);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + port);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
