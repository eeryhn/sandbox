/*  Primary layout component.  Does stuff.
 *
 *  Expected props:
 *   - a name (technically a pageId.  Looks for comment data based on this, yes.)
 *   - content, probably. idk yet.
 *
 * REVIEW:  Component vs PureComponent; probably a bad idea to spam pures before
 *          you figure things out.
 *
 * NOTE: Makes the assumption that the commentable content does not change in any
 *       meaningful way post-mount (i.e. commentable components don't move around,
 *       no new commentable components spawn).  Can easily be modified to account
 *       for change, but leaving as is for now because I can't imagine a scenario
 *       that doesn't seem like a UX nightmare + dun wanna update.
 */

import { PureComponent, cloneElement } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
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
    this.setState({commentableSubtrees: this.getCommentableSubtrees(this.props.content)});
  }

  getInitialProps() {

  }

  /**
   * Rebuild content.
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
      const isSelected = (node.props.id === this.state.selected);
      const props = {
        key: key,
        component: node.type,
        selected: isSelected,
        ...node.props
      }
      return(
        <Commentable {...props} setSelected={this.setSelected}>
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
   *
   * REVIEW: this makes me a little itchy.  the "all" property is included
   *         to account for skipped generations (i.e. the given node is not
   *         commentable, but in the next step up, we still want to know its
   *         children.)  As context of use seems limited entirely to the recursion
   *         itself, consider using only as a helper function.  idk.
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

  setSelected(id = "root") {
    this.setState({selected: id});
  }

  render() {
    const content =
      <Box onClick={this.setSelected}>
        {this.makeContent()}
      </Box>
    const comments = <CommentBlock data={this.state.commentData} selected={this.getSelectedSubtree()}/>;
    return(
      <SplitLayout left={content} right={comments} rightWidth="0.4" />
    );
  }

}

export default CommentLayout;
