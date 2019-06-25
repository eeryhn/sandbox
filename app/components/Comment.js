import { Component } from 'react';
import Box from '@material-ui/core/Box'

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Box ml={1.5} my={1} hidden={!this.props.isVisible}>
        {this.props.data &&
          <Box>
            <Box>
              {this.props.data.name}
            </Box>
            <Box>
              {this.props.data.content}
            </Box>
          </Box>
        }
        <Box>
          {this.props.children}
        </Box>
      </Box>
    );
  }
}

export default Comment;
