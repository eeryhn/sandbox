const express = require('express');
const router  = express.Router();
const passport = require('passport');
const knex = require('../db/knex.js');

router.get('/', (req, res) => {
  let {pageId: page_id, sort, sortDir: dir} = req.query;
  if(!sort) sort = 'comment_id';
  if(!dir) dir = 'asc'
  knex.select('*').from('comments')
    .where({page_id: req.query.page_id})
    .orderBy(sort, dir)
    .then((comments) => {
      let processedComments = {};
      comments.forEach(function(comment) {
        const {comment_id: id, page_id, parent_id, ...data} = comment;
        processedComments[id] = {data: data, children: []};
      });
      comments.forEach(function(comment) {
        const {comment_id: id, parent_id} = comment;
        if(parent_id) {
          processedComments[parent_id].children.push(id);
        }
      })
      res.json(processedComments);
    })
});

router.post('/', (req, res) => {
  if(req.isAuthenticated()) {

    const { user_id } = req.user;
    const { pageId: page_id, blockId: block_id, parentId: parent_id, content } = req.body;
    knex('comments').insert({ user_id: user_id,
                              page_id: page_id,
                              block_id: block_id,
                              parent_id: parent_id,
                              content: content
                            })
      .then( () => {
        res.sendStatus(200);
      })
      .catch( function(err) {
        console.log('POST COMMENT ERROR: ', err)
        res.json({
          message: "Oops. ):"
        });
      });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
