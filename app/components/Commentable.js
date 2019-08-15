/* REVIEW: - Using a workaround (onMouseOver, onMouseOut toggles) to handle hover
 *           state in order to prevent bubbling.  Look into alternate solutions.
 *         - tbh idk where to handle onClicks anymore. ):
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles  } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator'
import Box from '@material-ui/core/Box';

const styles = theme => ({
  container: {
    background: fade(theme.palette.primary.light, 0.1),
    padding: '1rem',
    marginBottom: '.5rem'
  },
  hover: {
    background: fade(theme.palette.primary.main, 0.12)
  },
  focused: {
    background: fade(theme.palette.primary.main, 0.15)
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
    const {id, classes, children, commentable, selected, setSelected, ...props} = this.props;

    return(
      <this.props.component
        {...props}
        id={id}
        className={`${classes.container} ${focused ? classes.focused : ""} ${hover ? classes.hover : ""}`}
        onMouseOver={(e) => this.handleMouseOver(e)}
        onMouseOut={() => this.handleMouseOut()}
      >
        {children}
      </this.props.component>
    );
  }
}

export default withStyles(styles)(Commentable);
