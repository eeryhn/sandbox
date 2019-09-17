import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Latex from 'react-latex';
import Utils from './utils';

const useStyles = makeStyles( theme => ({
  input: {
    padding: '.875rem 0 .875rem 1rem',
    fontSize: '1rem',
    textAlign: 'center'
  },
  phiDisplay: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    padding: '.5rem 0',
    '& > *': {
      padding: '0 1.5rem'
    }
  },
  totient: {
    minWidth: '10em'
  },
  totativesRoot: {
    borderLeft: `1px solid ${theme.palette.grey[200]}`,
    flexGrow: '1',
  },
  totatives: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '.5rem',
    '& > *': {
      padding: '.5rem 1rem',
      margin: '1%',
      textAlign: 'center'
    }
  },
  decimalWrapper: {
    padding: '.5rem',
    textAlign: 'center'
  },
  decimalDisplay: {
    display: 'inline-block',
    maxWidth: '100%',
    padding: '.5rem 0 1.375rem 0',
    fontSize: '1.5rem',
    letterSpacing: '.1rem',
    overflow: 'scroll'
  },
  decimalSegment: {
    margin: '0 .2rem',
    padding: '.5rem'
  },
  decimalError: {
    color: theme.palette.secondary.dark
  }
}));

export default function EulersDemo() {
  const classes = useStyles();
  const [n, setN] = useState('11');
  const [totatives, setTotatives] = useState([]);
  const [error, setError] = useState(false);
  const MIN = 3;
  const MAX = 50;

  useEffect( () => {
    setTotatives(Utils.getTotatives(n));
  }, [n])

  function handleInput(e) {
    const newN = e.target.value;
    if(newN >= MIN && newN <= MAX) {
      setN(newN);
      setError(false);
    } else {
      setError(true);
    }
  }

  function decimalNode() {
    const sequence = Utils.getInverseSequence(n);
    if(!sequence) {
      return(
        <div className={classes.decimalError}>
          <Box mb={2}>
            {`${n} and 10 are not coprime.`}
          </Box>
          <Box style={{fontSize: '.5em'}}>
            {`The greatest common divisor of ${n} and ${10} is ${Utils.gcd(n, 10)}`}
          </Box>
        </div>
      )
    }
    return(
      <Box display="flex" alignItems="center">
        <Box>
          0.
        </Box>
        {
          Array.from( { length: ( totatives.length  / sequence.length ) } ,
              (_, index) => (
                <Paper key={`decimal-${index}`} className={classes.decimalSegment} >
                  { sequence }
                </Paper>
              )
          )
        }
        <Box>
          ...
        </Box>
      </Box>
    );
  }

  return(
    <div>
      <Box mb={2}>
        <Box display="flex" alignItems="center">
          <Latex>
            $n = $
          </Latex>
          <TextField
            type="number"
            variant="outlined"
            inputProps={{min: "1"}}
            defaultValue={n}
            onChange={ handleInput }
            error={ error }
            style={{
              width: '60px',
              marginLeft: '10px'
            }}
            InputProps={{
              classes: {
                input: classes.input
              }
            }}
          />
        </Box>
        { error &&
          <Typography color="error" variant="body" >
            Try entering a value between { MIN } and { MAX }
          </Typography>
        }
      </Box>
      <Divider />
      <Box mt={2}>
        <Typography variant="button">
          decimal representation of 1 / {n}:
        </Typography>
      </Box>
      <div className={classes.decimalWrapper}>
        <div className={classes.decimalDisplay}>
          {decimalNode()}
        </div>
      </div>
      <Divider />
      <div className={classes.phiDisplay}>
        <div className={classes.totient}>
          <Latex>
            {`$\\phi(${n}) = ${totatives.length}$`}
          </Latex>
        </div>
        <div className={classes.totativesRoot}>
          <Typography variant="button">
            Numbers coprime to {n}:
          </Typography>
          <div className={classes.totatives}>
            {
              totatives.map( (val, index) => {
                return(
                  <Paper key={`totatives-${val}`}>
                    { val }
                  </Paper>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
