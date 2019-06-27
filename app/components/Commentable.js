/* REVIEW: - Using a workaround (onMouseOver, onMouseOut toggles) to handle hover
 *           state in order to prevent bubbling.  Look into alternate solutions.
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles  } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  container: {
    background: 'rgba(230, 230, 230, 0.2)'
  },
  hover: {
    background: 'rgba(170, 203, 255, 0.1)'
  },
  selected: {
    background: 'rgba(170, 203, 255, 0.3)'
  }
}));

function Commentable(props) {
  const [hover, setHover] = useState(false);
  const [renders, setRenders] = useState(0);
  const classes = useStyles();

  const {id, selected, setSelected} = props;

  function handleMouseOver(e) {
    e.stopPropagation();
    setHover(true);
  }
  function handleMouseOut() {
    setHover(false);
  }

  function handleClick(e) {
    e.stopPropagation();
    setSelected(id)
  }

  return(
    <props.component id={id}
    className={`${classes.container} ${selected ? classes.selected : ""} ${hover ? classes.hover : ""}`}
    onMouseOver={(e) => handleMouseOver(e)}
    onMouseOut={() => handleMouseOut()}
    onClick={(e) => handleClick(e)}>
      {props.children}
    </props.component>
  )
}

Commentable.propTypes = {
  id: PropTypes.string.isRequired
}

export default React.memo(Commentable);
