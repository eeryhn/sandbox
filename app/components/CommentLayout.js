/*  Primary layout component.  Does stuff.
 *
 *  Expected props:
 *   |-> a name (technically a pageId.  Looks for comment data based on this, yes.)
 *   |-> content, probably. idk yet.  Technically it should work on a blank page...?
 *      |-> why do you not test this stuff.
 *
 * REVIEW:  Component vs PureComponent; probably a bad idea to spam pures before
 *          you figure things out.
 *
 * NOTE: Assumes that the commentable content does not change in any
 *       meaningful way post-mount (i.e. commentable components don't move around,
 *       no new commentable components spawn).  Can easily be modified to account
 *       for change, but leaving as is for now because I can't imagine a scenario
 *       that doesn't seem like an absolute UX nightmare + don't want to keep
 *       rebuilding page.
 */

import { PureComponent, cloneElement } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import FixedNav from './FixedNav';
import SplitLayout from './SplitLayout';
import Commentable from './Commentable';
import CommentBlock from './CommentBlock';
import ScrollNav from './ScrollNav';

class CommentLayout extends PureComponent {

  static propTypes = {
    pageId: PropTypes.string.isRequired,
    content: PropTypes.element
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      selectedHistory: []
    }
    this.popHistory = this.popHistory.bind(this);
    this.setHighlight = this.setHighlight.bind(this);
    this.selectAndScroll = this.selectAndScroll.bind(this);
  }

  componentDidMount() {
    const MIN_WIDTH = 750;

    this.MAX_STACK = 100;
    this.commentableNodes = {};
    this.commentableSubtrees = this.getCommentableSubtrees(this.props.content);
    this.content =
      <Box
        style={{padding: '.8rem'}}
        onClick={this.select}
      >
        {this.makeContent()}
      </Box>;

    this.setState({
      showComments: window.innerWidth > MIN_WIDTH
    });
  }

  /**
   * Rebuild content, setup refs.
   */
  makeContent(node = this.props.content, key = "0") {
    if(!node.props) {
      return (
        <span key={key}>{node}</span>
      )
    }
    let { id, commentable, children, color, ...nodeProps } = node.props;
    if(Array.isArray(children)) {
      children = children.map(function(child, index) {
        return this.makeContent(child, key + index);
      }, this);
    }

    if(commentable) {
      const props = {
        id: id,
        key: key,
        selected: node.props.id === this.props.selected,
        color: color
      }
      return(
        <Commentable
          {...props}
          onClick={(e)=> this.select(e, node.props.id)}
          ref={ elt => this.commentableNodes[node.props.id] = elt }
        >
          { cloneElement(node, {commentable: undefined, id: undefined}, children) }
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
    return this.commentableSubtrees[this.state.selected];
  }

  setSelected(id) {
    let selectedNode = this.commentableNodes[this.state.selected];
    if(selectedNode) {
      selectedNode.setFocused(false);
    }

    this.setState({selected: id});
    this.commentableNodes[id].setFocused(true);
  }

  setHighlight(id, bool) {
    this.commentableNodes[id].setHighlight(bool);
  }

  select(e, id = "root") {
    if (e) e.stopPropagation();
    if(id === this.state.selected) return;

    if(this.commentableNodes[this.state.selected])
      this.pushHistory(this.state.selected);
    this.setSelected(id);
  }

  // there's probably a way to collapse select and selectAndScroll.
  selectAndScroll(id) {
    if(id === this.state.selected) return;

    if(this.commentableNodes[this.state.selected])
      this.pushHistory(this.state.selected);
    this.setSelected(id);
    this.commentableNodes[id].scrollToTop();
  }

  pushHistory(id) {
    let history = this.state.selectedHistory;
    history.push(id);

    if(history.length > this.MAX_STACK) {
      history = history.slice(-(this.MAX_STACK));
    }

    this.setState({selectedHistory: history});
  }

  popHistory() {
    let history = this.state.selectedHistory;
    const prev = history.pop();
    this.setSelected(prev);
    this.commentableNodes[prev].scrollToTop();
    this.setState({selectedHistory: history});
  }

  render() {
    if(this.state.showComments) {
      const comments =
        <CommentBlock
          pageId={this.props.pageId}
          selectedId={this.state.selected}
          selectedTree={this.getSelectedSubtree()}
          selectedHistory={{
            history: this.state.selectedHistory,
            pop: this.popHistory
          }}
          setHighlight={this.setHighlight}
          setFocus={this.selectAndScroll}
        />;
      return(
        <FixedNav pageId={this.props.pageId}>
          <SplitLayout left={comments} right={this.content}/>
        </FixedNav>
      );
    } else {
      return (
        <ScrollNav pageId={this.props.pageId}>
          {this.content}
        </ScrollNav>
      )
    }
  }
}

export default CommentLayout;
