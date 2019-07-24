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
    background: 'rgba(230, 230, 230, 0.2)'
  },
  hover: {
    background: 'rgba(170, 203, 255, 0.1)'
  },
  focused: {
    background: 'rgba(170, 203, 255, 0.3)'
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
      focused: false
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
  handleClick(e) {
    e.stopPropagation();
    this.props.setSelected(this.props.id)
    this.setFocused(true);
  }

  render() {
    const {focused, hover} = this.state;
    const {id, classes, children} = this.props;

    return(
      <this.props.component id={id}
      className={`${classes.container} ${focused ? classes.focused : ""} ${hover ? classes.hover : ""}`}
      onMouseOver={(e) => this.handleMouseOver(e)}
      onMouseOut={() => this.handleMouseOut()}
      onClick={(e) => this.handleClick(e)}>
        {children}
      </this.props.component>
    );
  }
}

export default withStyles(styles)(Commentable);
