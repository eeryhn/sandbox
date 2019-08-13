import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CommentForm from './CommentForm';
import { UserContext } from './UserContext';

const useStyles = makeStyles( theme => ({
  root: {
    padding: '.25rem'
  },
  userInfo: {
    color: theme.palette.grey['800'],
    padding: '.25rem 0'
  },
  commentBody: {
    padding: '0 .5rem'
  },
  children: {
    margin: '.875rem 0 .25rem .6rem',
    padding: '0 0 0 1rem',
    borderLeft: `1px solid ${theme.palette.grey['400']}`
  }
}));

function Comment(props) {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  const [replying, toggleReply] = useState(false);
  const [expanded, toggleCollapse] = useState(true);
  const { pageId, name, user_id, content, block_id, children } = props.data;
  const date = new Date(props.data.created_at);
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateStr = `${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;

  return(
    <Box className={classes.root}>
      <Box className={classes.userInfo}>
        <Typography variant="body2">
          {`${user_id}:${name} @ ${dateStr}`}
        </Typography>
        <Button size="small" onClick={() => toggleCollapse(!expanded)}>
          collapse
        </Button>
      </Box>
      { expanded &&
        <Box>
          <Box className={classes.commentBody}>
            {content}
            <UserContext.Consumer>
              { user => {
                if(user) return(
                  <Box ml={1.5} my={1}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button size="small"
                        variant={`${replying ? "outlined" : 'text'}`}
                        onClick={() => toggleReply(!replying)}
                      >
                        Reply
                      </Button>
                    </Box>
                    { replying &&
                      <CommentForm
                        pageId={pageId}
                        blockId={block_id}
                        parentId ={props.cid}
                        updateComments={props.updateComments}/>
                    }
                  </Box>
                )
                else return;
              }}
            </UserContext.Consumer>
          </Box>
          { props.children.length > 0 &&
            <Box className={classes.children}>
              {props.children}
            </Box>
          }
        </Box>
      }
    </Box>
  );
}

Comment.propTypes = {
  data: PropTypes.object.isRequired
}

export default Comment;
