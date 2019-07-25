/*
 *
 *
 *
 *
 */

import { Component } from 'react';
import { withStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box';
import Comment from './Comment';
import CommentForm from './CommentForm';

const styles = theme => ({
  container: {
    padding: '1rem'
  }
});

class CommentBlock extends Component {

  constructor(props) {
    super(props);

    const dummyData = {
      "0" : {
        "children": [1, 2, 3, 5, 6, 4]
      },
      "1" : {
        "data": {
          "content": "Testing",
          "block": "1"
        },
        "children": []
      },
      "2" : {
        "data": {
          "content": "My butt itches",
          "block": "2"
        },
        "children": [8, 10]
      },
      "3" : {
        "data": {
          "content": "So this isn't entirely accurate, right?  Because if you take X, Y, and Z and solve for A, then you get X = go away and Y = up yours.",
          "block": "5"
        },
        "children": []
      },
      "4" : {
        "data": {
          "content": "I'm attached to a block called test :3",
          "block": "test"
        },
        "children": []
      },
      "5" : {
        "data": {
          "content": "I am also attached to a test block",
          "block": "test"
        },
        "children": []
      },
      "6" : {
        "data": {
          "content": "Helloooooo",
          "block": "double-test"
        },
        "children": []
      },
      "8" : {
        "data": {
          "content": "Ew",
          "block": "2"
        },
        "children": []
      },
      "10" : {
        "data": {
          "content": "Are you a monkey",
          "block": "2"
        },
        "children": [11]
      },
      "11" : {
        "data": {
          "content": "Try to give him a banana",
          "block": "2"
        },
        "children": [14]
      },
      "14" : {
        "data": {
          "content": "Don't feed the animals",
          "block": "2"
        },
        "children": []
      },
    };

    this.state = {
      data: dummyData
    };
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
    const threads = this.state.data[0].children.map((id) => {
      const data = this.state.data[id].data;
      if(!this.props.selected || this.props.selected.includes(data.block))
        return this.makeThreads(id);
    });
    return(
      <Box className={this.props.classes.container}>
        <CommentForm/>
        {threads}
      </Box>
    );
  }

}

export default withStyles(styles)(CommentBlock);
