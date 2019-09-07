import React, { useState } from 'react';
import Latex from 'react-latex';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 -.5rem "
  },
  formula: {
    fontSize: "1.5rem",
    letterSpacing: ".1rem",
    padding: "3rem 0 4rem 0"
  },
  note: {
    color: theme.palette.grey[800],
    fontSize: ".7rem"
  },
  tooltip: {
    padding: "1rem",
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: ".875rem"
  },
  tooltipTrigger: {
    color: theme.palette.secondary.light,
    "&:hover": {
      color: theme.palette.secondary.dark
    }
  }
}));

export default function EulersTheorem() {
  const classes = useStyles();

  return(
    <Box className={classes.root}>
      <Latex>Given two relatively prime integers, $a$ and $n$:</Latex>
      <Box textAlign="center" className={classes.formula}>
        <Latex>$a$</Latex>
        <Tooltip
          classes={{tooltip: classes.tooltip}}
          placement="top"
          title={
            <React.Fragment>
              <b>Euler's Totient Function</b> (represented by <Latex>$\phi(n)$</Latex>) represents
              the number of integers less than <Latex>$n$</Latex> that are relatively
              prime to <Latex>$n$</Latex>.
            </React.Fragment>
          }
          interactive
        >
          <span className={classes.tooltipTrigger}>
            <Latex>{`$^{\\phi(n)}$`}</Latex>
          </span>
        </Tooltip>
        <Latex>{`$\\equiv \\hspace{1mm}$`}</Latex>
        <Tooltip
          classes={{tooltip: classes.tooltip}}
          placement="bottom"
          title={
            <React.Fragment>
              <Latex>
                {`$a \\equiv  r \\hspace{1mm} mod \\hspace{1mm} n$ (read
                  $a$ is congruent to $r$ modulo $n$) indicates $r$ is the remainder
                  resulting from division of $a$ by $n$.`}
              </Latex>
              <div className={classes.note}>
                <Latex>
                  {`(e.g. $24 \\equiv 4 \\hspace{1mm} mod \\hspace{1mm} n$ as $24
                    \\div 10$ results in $2$ with a remainder of $4$)`}
                </Latex>
              </div>
            </React.Fragment>
          }
          interactive
        >
          <span className={classes.tooltipTrigger}>
            <Latex>{`$1 \\hspace{1mm} mod \\hspace{1mm} n$`}</Latex>
          </span>
        </Tooltip>
      </Box>
    </Box>
  )
}
