import { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
      dir: 'desc',
      data: []
    };

    this.getCommentData = this.getCommentData.bind(this);
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
        <Comment
          key={key}
          cid={key}
          hidden={this.props.selectedTree && !this.props.selectedTree.includes(comment.data.block_id)}
          data={{...comment.data, pageId:this.props.pageId}}
          children={children}
          updateComments={this.getCommentData}/>
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
        return this.makeThreads(id);
      });
    }
    return(
      <Box className={this.props.classes.container}>
        { this.props.selectedId &&
          <CommentForm
              pageId={this.props.pageId}
              blockId={this.props.selectedId}
              updateComments={this.getCommentData}
          />
        }
        {threads}
      </Box>
    );
  }

}

CommentBlock.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default withStyles(styles)(CommentBlock);
