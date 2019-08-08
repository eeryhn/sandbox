import { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box';
import Comment from './Comment';
import CommentForm from './CommentForm';
import axios from 'axios';

const styles = theme => ({
  container: {
    padding: '1rem'
  }
});

class CommentBlock extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      sort: 'comment_id',
      dir: 'asc',
      data: []
    };
  }

  componentDidMount() {
    this.getCommentData();
  }

  getCommentData() {
    axios.get('/api/comment/', {
      params: {
        page_id: this.props.pageId,
        sort: this.state.sort,
        dir: this.state.dir
      }
    }).then( res => {
      this.setState({ data: res.data });
    });
  }

  // simple recursive method to render comment threads
  makeThreads(key) {
    const comment = this.state.data[key];
    if(comment) {
      const children = comment.children.map((id) =>
        this.makeThreads(id)
      );
      return(
        <Comment key={key} cid={key} data={comment.data} children={children}/>
      );
    } else {
      console.warn("Could not find comment with ID: " + key);
      return "";
    }
  }

  render() {
    let threads;
    if(this.state.data[0]) {
      threads = this.state.data[0].children.map((id) => {
        const commentData = this.state.data[id].data;
        if(!this.props.selected || this.props.selected.includes(commentData.block_id))
          return this.makeThreads(id);
      });
    }
    return(
      <Box className={this.props.classes.container}>
        <CommentForm/>
        {threads}
      </Box>
    );
  }

}

export default withStyles(styles)(CommentBlock);
