import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { UserContext } from './UserContext';
import axios from 'axios';

function CommentForm(props) {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState({});

  useEffect(() => {
    setMessage({});
  }, [props.blockId])

  function handleChange(e) {
    setComment(e.target.value);
  }

  function submitComment() {
    if(!comment) {
      setMessage({
        text: 'no comment ):',
        type: 'error'
      })
    } else {
      axios.post('/comment/', {
        comment: comment,
        pageId: props.pageId,
        blockId: props.blockId,
        parentId: props.parentId
      })
      .then( res => {
        setComment('');
        setMessage({
          text: 'Success!',
          type: 'primary'
        })
        if(props.updateComments) props.updateComments();
      })
      .catch( err => {
        console.log(err);
        if(err.response.status === 401) {
          window.location.reload();
        } else {
          setMessage({
            text: 'Oops!  Something went wrong.  Try again later?',
            type: 'error'
          });
        }
      });
    }
  }

  return(
    <UserContext.Consumer>
      { user => {
        if(user) return(
          <form>
            <OutlinedInput value={comment} onChange={handleChange}
              fullWidth={true} margin="dense"
              multiline={true} rows={3} rowsMax={9}
            />
            <Box>
              <Button variant="outlined" color="primary" onClick={submitComment}>
                Post
              </Button>
            </Box>
            { message.text &&
              <Typography color={message.type} variant="body2" >
                {message.text}
              </Typography>
            }
          </form>
        );
        else return;
      }}
    </UserContext.Consumer>
  )
};

CommentForm.propTypes = {
  blockId: PropTypes.string.isRequired
};

export default CommentForm;
