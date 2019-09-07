import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles( theme => ({
  root: {
    "& > span": {
      zIndex: "10",
      display: "inline-block",
      width: "1.5rem",
      padding: "0",
      textAlign: "center",
      fontSize: "1.5rem",
      color: fade(theme.palette.common.black, 0.5)
    }
  },
  slider: {
    height: "100%",
    width: "50%",
    backgroundColor: fade(theme.palette.grey[700], 0.5),
    position: "absolute",
    top: "0",
    zIndex: "-10"
  }
}));

export default function CNSlider() {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  const [initX, setInitX] = useState(0);
  const [xPos, setX] = useState("4.5rem");

  function handleMouseDown(e) {
    setActive(true);
    setInitX(e.clientX);
  }

  function handleMouseMove(e) {
    if(active) {
      setX(e.clientX);
    }
  }

  function handleMouseUp() {
    setActive(false);
  }

  return(
    <center>
      <Box position="relative" display="inline-block" className={classes.root}>
        <Box left={xPos} className={classes.slider}/>
        <span>1</span>
        <span>4</span>
        <span>2</span>
        <span>8</span>
        <span>5</span>
        <span>7</span>
        <span>1</span>
        <span>4</span>
        <span>2</span>
        <span>8</span>
        <span>5</span>
        <span>7</span>
      </Box>
    </center>
  )
}
