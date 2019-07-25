/*  Primary layout component.  Does stuff.
 *
 *  Expected props:
 *   - a name (technically a pageId.  Looks for comment data based on this, yes.)
 *   - content, probably. idk yet.  Technically it works on a blank page...
 *
 * REVIEW:  Component vs PureComponent; probably a bad idea to spam pures before
 *          you figure things out.
 *
 * NOTE: Assumes that the commentable content does not change in any
 *       meaningful way post-mount (i.e. commentable components don't move around,
 *       no new commentable components spawn).  Can easily be modified to account
 *       for change, but leaving as is for now because I can't imagine a scenario
 *       that doesn't seem like a UX nightmare + dun wanna update.
 */

import { PureComponent, cloneElement } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import SplitLayout from './SplitLayout';
import Commentable from './Commentable';
import CommentBlock from './CommentBlock';

class CommentLayout extends PureComponent {

  static propTypes = {
    pageId: PropTypes.string.isRequired,
    content: PropTypes.element
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      commentData: {},
      commentableSubtrees: {}
    }
    this.setSelected = this.setSelected.bind(this);
  }

  componentDidMount() {
    this.commentableNodes = {};
    this.content =
      <Box onClick={this.setSelected}>
        {this.makeContent()}
      </Box>;

    this.setState({commentableSubtrees: this.getCommentableSubtrees(this.props.content)});
  }

  getInitialProps() {

  }

  /**
   * Rebuild content, setup refs.
   */
  makeContent(node = this.props.content, key = "0") {
    if(!node.props) {
      return (
        <p key={key}>{node}</p>
      )
    }
    let { children } = node.props;
    if(Array.isArray(children)) {
      children = children.map(function(child, index) {
        return this.makeContent(child, key + index);
      }, this);
    }

    if(node.props.commentable) {
      const props = {
        key: key,
        component: node.type,
        ...node.props
      }
      return(
        <Commentable {...props}
          onClick={(e)=> this.setSelected(e, node.props.id)}
          ref={ elt => this.commentableNodes[node.props.id] = elt }
        >
          {children}
        </Commentable>
      )
    } else {
      return(
        cloneElement(node, {key: key, ...node.props}, children)
      )
    }
  }

  /* returns:
   *     subtrees: an object mapping commentable components to an array of
   *               commentable children up to the given node.
   *     ids:      an array listing all commentable components up to the given
   *               node
   */
  getCommentableSubtrees(node) {
    if(!node.props) return;
    const { children, id } = node.props;
    if(id === 'root') {
      console.warn("Detected node with ID 'root'.  Please rename, yes?")
    }
    let ids = (id ? [id] : []);
    let subtrees = {};
    if(Array.isArray(children)) {
      children.forEach(function(child, index) {
        let childSubtrees = this.getCommentableSubtrees(child);
        if(childSubtrees) {
          ids = ids.concat(childSubtrees['root']);
          subtrees = {...subtrees, ...childSubtrees};
        }
      }, this);
    }
    if(node.props.commentable === true) {
      subtrees[id] = ids;
    }
    subtrees['root'] = ids;
    return subtrees;
  }

  getSelectedSubtree() {
    return this.state.commentableSubtrees[this.state.selected];
  }

  setSelected(e, id = "root") {
    e.stopPropagation();

    let selectedNode = this.commentableNodes[this.state.selected];
    if(selectedNode) {
      selectedNode.setFocused(false);
    }

    this.setState({selected: id});
    this.commentableNodes[id].setFocused(true);
  }

  render() {
    const comments = <CommentBlock data={this.state.commentData} selected={this.getSelectedSubtree()}/>;
    return(
      <Box height="100%" position="fixed">
        <Box height="100%" display="flex" flexDirection="column">
          <NavBar pageId={this.props.pageId}/>
          <SplitLayout left={comments} right={this.content}/>
        </Box>
      </Box>
    );
  }

}

export default CommentLayout;
