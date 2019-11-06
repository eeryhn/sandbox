import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles( theme => ({
  root: {
    padding: "1rem",
    fontSize: "1.5rem",
    letterSpacing: ".2rem",
    "& > div": {
      padding: ".5rem 0",
      "&:not(:last-child)": {
        marginBottom: ".5rem"
      }
    }
  },
  sliderNums: {
    "& > span": {
      zIndex: "10",
      display: "inline-block",
      width: "1.5rem",
      textAlign: "center",
      color: fade(theme.palette.common.black, 0.2)
    }
  },
  highlighted: {
    color: `${theme.palette.common.black} !important`
  },
  slider: {
    height: "100%",
    width: "50%",
    borderRadius: '.2rem',
    position: "absolute",
    top: "0",
    zIndex: "10",
    backgroundColor: fade(theme.palette.secondary.light, 0.3),
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.main, 0.3)
    }
  },
  active: {
    backgroundColor: `${fade(theme.palette.secondary.main, 0.5)} !important`
  },
  noSelect: {
    userSelect: 'none'
  }
}));

export default function CNSlider() {
  const classes = useStyles();
  const fontSize = parseInt(getComputedStyle(document.documentElement).fontSize);
  const spanWidth = 1.5;
  const minX = 0;
  const maxX = spanWidth * 6 * fontSize;
  const [active, setActive] = useState(false);
  const [initX, setInitX] = useState(0);
  const [startIndex, setIndex] = useState(0);
  const [xPos, setX] = useState(spanWidth * startIndex * fontSize);

  function handleMouseDown(e) {
    setActive(true);
    setInitX(e.clientX);
  }

  function handleMouseMove(e) {
    if(active) {
      let newX = xPos + (e.clientX - initX);
      if(newX < minX) newX = minX;
      else if(newX > maxX) newX = maxX;
      const index = Math.round(newX / (spanWidth * fontSize));
      setX(newX);
      setIndex(index);
      setInitX(e.clientX);
    }
  }

  function handleMouseUp() {
    setActive(false);
    setX(spanWidth * startIndex * fontSize);
  }


  const string = "142857142857"

  return(
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className={`${classes.root} ${classes.noSelect}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Box position="relative" display="inline-block" className={classes.sliderNums}>
        <Box
          left={`${xPos}px`}
          className={`${classes.slider} ${active && classes.active}`}
          onMouseDown={handleMouseDown}
        />
        {
          [...string].map( (char, index) => {
            return(
              <span
                key={index}
                className={`${(index >= startIndex && index < startIndex + 6) ? classes.highlighted : ''}`}
              >
                {char}
              </span>
            )
          })
        }
      </Box>
      <Box>
        = {Math.pow(10, startIndex) % 7} x 142857
      </Box>
    </Box>
  )
}
