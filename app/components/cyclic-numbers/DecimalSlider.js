import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Latex from 'react-latex';
import Utils from './utils';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '1.2rem',
    textAlign: 'center'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '7% 39% 3% 39% 7%',
    gridGap: '2%'
  },
  buttons: {

  },
  paperDisplay: {
    padding: '1rem 0',
    width: '100%'
  },
  derivation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  derivArrow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '.5em',
    margin: '1rem 0',
    '& > *': {
      margin: '-.6rem 0'
    }
  },
  derivationLeft: {
    gridColumnStart: '2'
  },
  derivationRight: {
    gridColumnStart: '4'
  },
  conclusion: {
    padding: '1rem 0',
    width: '100%',
    fontSize: '.75rem',
    marginBottom: '1rem',
    backgroundColor: fade(theme.palette.primary.light, 0.3),
    border: `1px solid ${theme.palette.primary.light}`
  }
}));

export default function DecimalSlider(props) {
  const classes = useStyles();
  const [decPosition, setDecPosition] = useState(0);
  const [scale, setScale] = useState(1);
  const [sequence, setSequence] = useState('');

  useEffect( () => {
    setSequence(Utils.getInverseSequence(props.divisor));
  }, []);

  useEffect( () => {
    setScale(Math.pow(10, decPosition));
  }, [decPosition])

  function shiftDecimal(shift) {
    setDecPosition(decPosition + shift);
  }

  return(
    <div className={classes.root}>
      <Latex displayMode>
        {`$${Math.pow(10, decPosition)} \\times 0.\\overline{${sequence}} =$`}
      </Latex>
      <div className={classes.gridContainer}>
        <Button
          variant="outlined"
          color="secondary"
          disabled={decPosition === 0}
          onClick={ () => shiftDecimal(-1)}
          className={classes.button}
        >
          <KeyboardArrowLeft/>
        </Button>
        <Paper className={classes.paperDisplay}>
          { parseInt(sequence.substring(0, decPosition)) || 0 }
        </Paper>
        <Box pt="1.2rem" pb="1.2rem" fontSize="3rem">
          .
        </Box>
        <Paper className={classes.paperDisplay}>
          {`${sequence.substring(decPosition, sequence.length)}${sequence.substring(0, decPosition)}...`}
        </Paper>
        <Button
          variant="outlined"
          color="secondary"
          disabled={decPosition === sequence.length }
          onClick={ () => shiftDecimal(1)}
          className={classes.button}
        >
          <KeyboardArrowRight/>
        </Button>
        <div className={`${classes.derivation} ${classes.derivationLeft}`}>
          <div className={classes.derivArrow}>
            <ArrowDropUp/>
            equals
            <ArrowDropDown/>
          </div>
          <Paper className={classes.paperDisplay}>
            <Latex>
              {`$\\frac{${scale - (scale % props.divisor)}}{${props.divisor}}$`}
            </Latex>
          </Paper>
        </div>
        <div className={`${classes.derivation} ${classes.derivationRight}`}>
          <div className={classes.derivArrow}>
            <ArrowDropUp/>
            equals
            <ArrowDropDown/>
          </div>
          <Paper className={classes.paperDisplay}>
            <Latex>
              {`$\\frac{${scale % props.divisor}}{${props.divisor}}$`}
            </Latex>
          </Paper>
        </div>
        <div className={`${classes.derivation} ${classes.derivationRight}`}>
          <div className={classes.derivArrow}>
            <ArrowDropUp/>
            suggests
            <ArrowDropDown/>
          </div>
          <Paper className={classes.conclusion}>
            <Latex>
              {`$${sequence * (scale % props.divisor)} = ${scale % props.divisor} \\times ${sequence}$`}
            </Latex>
          </Paper>
        </div>
      </div>
    </div>
  )
}
