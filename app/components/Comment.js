import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CommentForm from './CommentForm';
import Button from '@material-ui/core/Button';
import { UserContext } from './UserContext';

function Comment(props) {
  const [active, setActive] = useState(false);
  const [replying, toggleReply] = useState(false);
  const { pageId, name, content, block_id, children } = props.data;

  return(
    <Box>
      <Box>
        <Box>
          <Box>
            {name}
          </Box>
          <Box>
            {content}
          </Box>
        </Box>
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
      <Box ml={1.5} my={1}>
        {props.children}
      </Box>
    </Box>
  );
}

Comment.propTypes = {
  data: PropTypes.object.isRequired
}

export default Comment;
