/* REVIEW: - Using a workaround (onMouseOver, onMouseOut toggles) to handle hover
 *           state in order to prevent bubbling.  Look into alternate solutions.
 *         - tbh idk where to handle onClicks anymore. ):
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles  } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  container: {
    borderRadius: '.2rem',
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: '.875rem 1rem',
    margin: '0 -.3rem .5rem -.3rem',
    lineHeight: '1.5rem',
    '& p': {
      margin: '0'
    }
  },
  hover: {
    borderColor: theme.palette.grey[400]
  },
  focused: {
    borderColor: theme.palette.grey[900]
  }
})

class Commentable extends PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      focused: props.selected
    }
  }

  setHover(bool) {
    this.setState({hover: bool});
  }
  setFocused(bool) {
    this.setState({focused: bool});
  }

  handleMouseOver(e) {
    e.stopPropagation();
    this.setHover(true);
  }
  handleMouseOut() {
    this.setHover(false);
  }

  render() {
    const {focused, hover} = this.state;
    const {classes, commentable, selected, setSelected, ...props} = this.props;

    return(
      <div
        {...props}
        className={`${classes.container} ${focused ? classes.focused : ""} ${hover ? classes.hover : ""}`}
        onMouseOver={(e) => this.handleMouseOver(e)}
        onMouseOut={() => this.handleMouseOut()}
      >
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles)(Commentable);
