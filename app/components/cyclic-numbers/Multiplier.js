import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles'
import Latex from 'react-latex';

const useStyles = makeStyles(theme => ({
  input: {
    padding: '.875rem 0 .875rem 1rem',
    fontSize: '1rem',
    textAlign: 'center'
  },
  product: {
    fontSize: '1.8rem !important'
  },
  numFragment: {
    letterSpacing: '.2rem',
    margin: '0 .5rem'
  },
  addDivider: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 .5rem',
    '& div': {
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      '& span': {
        background: theme.palette.grey[50],
        fontSize: '1.1rem'
      }
    }
  },
  line: {
    fontSize: '1.5rem',
    padding: '.3rem'
  },
  sum: {
    letterSpacing: '.25rem',
    margin: '.5 .5rem'
  },
  results: {
    '& $line:nth-child(odd)': {
      '& $numFragment': {
        color: theme.palette.grey[700]
      },
      '& $sum': {
        color: theme.palette.primary.dark
      }
    },
    '& $line:nth-child(even)':{
      '& $numFragment': {
        color: theme.palette.primary.dark
      },
      '& $sum': {
        color: theme.palette.grey[700]
      }
    }
  }
}));

export default function Multiplier() {
  const [n, setN] = useState("14");
  const [sum, updateSum] = useState(142857);
  const classes = useStyles();

  function rightSplit(val, interval) {
    let str = val.toString();
    let splitAt = (str.length % interval ? str.length % interval : interval);
    let arr = [];
    while(splitAt <= str.length) {
      arr.push(str.slice(0, splitAt));
      str = str.slice(splitAt, str.length);
      splitAt = interval;
    }
    return arr;
  }

  function renderSplitSum(val) {
    if(val.length < 7) {
      updateSum(val);
      return;
    } else {
      const splitProd = rightSplit(val, 6);
      const sum = splitProd.reduce((sum, val) => sum + parseInt(val), 0);
      return(
        <React.Fragment>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap" mt={2}
            className={classes.line}
          >
            { splitProd.map((val, index) => {
                return(
                  <React.Fragment key={`${val}-${index}`}>
                    <Box className={classes.numFragment}>
                      {val}
                    </Box>
                    { !(index === (splitProd.length - 1)) &&
                      <Box className={classes.addDivider}>
                        <div>
                          <span>
                            +
                          </span>
                        </div>
                        <Divider orientation="vertical"/>
                      </Box>
                    }
                  </React.Fragment>
                );
              })
            }
            <div className={classes.numFragment}>
              =
            </div>
            <div className={classes.sum}>
              {sum}
            </div>
          </Box>
          { sum.toString().length > 6 && renderSplitSum(sum)}
        </React.Fragment>
      )
    }
  }

  return(
    <div onClick={(e) => e.stopPropagation()} >
      <Box display="flex" alignItems="center" mb={2}>
        <Latex>
          $n = $
        </Latex>
        <TextField
          type="number"
          variant="outlined"
          inputProps={{min: "1"}}
          value={n}
          onChange={(e) => setN(e.target.value)}
          style={{
            width: '100px',
            marginLeft: '10px'
          }}
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
      </Box>
      <Box>
        { (Number.isInteger(parseInt(n)) && parseInt(n) >= 1) ? (
          <div className={classes.results}>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              className={`${classes.product} ${classes.line}`}
            >
              <span className={classes.numFragment}> { n } </span>
              <Latex>$\times$</Latex>
              <span className={classes.numFragment}> 142857 </span>
              <span className={classes.numFragment}> = </span>
              <span className={classes.sum}> { n * 142857 } </span>
            </Box>
            { renderSplitSum(142857 * n) }
          </div>
        ) : (
          <p>
            Try entering a positive number :)
          </p>
        )}
      </Box>
    </div>
  )
}
