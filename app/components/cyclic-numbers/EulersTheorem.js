import React, { useState } from 'react';
import Latex from 'react-latex';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles(theme => ({
  badge: {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: `1px solid ${theme.palette.secondary.main}`,
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

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
    animation: '$pulse .8s infinite linear',
    "&:hover": {
      color: theme.palette.secondary.dark,
      animation: 'none'
    }
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: .5,
    },
    '100%': {
      opacity: 1,
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
          placement="top"
          title={
            <React.Fragment>
              <Latex>
                {`$a \\equiv  r \\hspace{1mm} mod \\hspace{1mm} n$ indicates $r$
                  is the remainder resulting from division of $a$ by $n$.`}
              </Latex>
              <div className={classes.note}>
                <Latex>
                  {`(e.g. $24 \\equiv 4 \\hspace{1mm} mod \\hspace{1mm} 10$ since $24
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
