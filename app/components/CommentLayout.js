import SplitLayout from './SplitLayout';
import CommentBlock from './CommentBlock';
import { Component } from 'react';
import Box from '@material-ui/core/Box';

class CommentLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      selected: props.selected,
      commentData: props.cdata,
      commentableSubtrees: {}
    }
    this.setSelected = this.setSelected.bind(this);
  }

  componentDidMount() {
    this.setState({commentableSubtrees: this.getCommentableSubtrees(this.props.content).subtrees});
  }

  /* returns:
   *     subtrees: an object mapping commentable components to an array of
   *               commentable children up to the given node.
   *     ids:      an array listing all commentable components up to the given
   *               node
   *
   * REVIEW: this makes me a little itchy.  the "all" property is included
   *         to account for skipped generations (i.e. the given node is not
   *         commentable, but in the next step up, we still want to know its
   *         children.)  Context of use limited almost entirely to the recursion
   *         itself.  Also, so many deca
   */
  getCommentableSubtrees(node) {
    const children = node.props.children;
    let id = node.props.id;
    let ids = (id ? [id] : []);
    let subtrees = {};
    if(Array.isArray(children)) {
      children.forEach(function(child, index) {
        let childSubtrees = this.getCommentableSubtrees(child);
        ids = ids.concat(childSubtrees.all);
        subtrees = {...subtrees, ...childSubtrees.subtrees};
      }, this);
    }
    if(node.type.type && node.type.type.name === "Commentable") {
      subtrees[id] = ids;
    }
    return {
      subtrees: subtrees,
      all: ids
    }
  }

  setSelected(e) {
    let selected = this.state.commentableSubtrees[e.target.id];
    this.setState({selected: selected});
  }

  render() {
    let content =
      <Box onClick={this.setSelected}>
        {this.state.content}
      </Box>
    let comments = <CommentBlock data={this.state.commentData} selected={this.state.selected}/>;
    return(
      <SplitLayout left={content} right={comments} rightWidth="0.4" />
    );
  }

}

export default CommentLayout;
