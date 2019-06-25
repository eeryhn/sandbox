/*  TODO: - Styling
 *
 *
 * REVIEW: - Using a workaround (onMouseOver, onMouseOut toggles) to handle hover
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
  active: {
    background: 'rgba(170, 203, 255, 0.3)'
  }
}));

function Commentable(props) {
  const classes = useStyles();
  const [active, setActive] =  useState(false);
  const [hover, setHover] = useState(false);

  function handleMouseOver(e) {
    e.stopPropagation();
    setHover(true);
  }
  function handleMouseOut() {
    setHover(false);
  }

  return(
    <Box component={props.component} id={props.id} className={`${classes.container} ${active ? classes.active : ""} ${hover ? classes.hover : ""}`}
    onMouseOver={(e) => handleMouseOver(e)} onMouseOut={() => handleMouseOut()}>
      {props.children}
    </Box>
  )
}

Commentable.propTypes = {
  id: PropTypes.string.isRequired
}

export default React.memo(Commentable);
