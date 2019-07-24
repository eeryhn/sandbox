import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CommentForm from './CommentForm';
import Button from '@material-ui/core/Button';

function Comment(props) {
  const [active, setActive] = useState(false);
  const [replying, toggleReply] = useState(false);
  const { name, content, block, children } = props.data;

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
        <Box ml={1.5} my={1}>
          <Box display="flex" justifyContent="flex-end">
            <Button size="small"
            disableRipple={true} disableFocusRipple={true}
            variant={`${replying ? "outlined" : 'text'}`}
            onClick={(e) => console.log(e)}>
              Reply
            </Button>
          </Box>
          { replying &&
            <CommentForm blockId={block} parentId ={props.cid} />
          }
        </Box>
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
