import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Latex from 'react-latex';

const tabStyles = makeStyles(theme => ({
  root: {
    minWidth: 'initial',
    maxWidth: 'initial',
    minHeight: 'initial',
    flexShrink: 'initial',
    flexGrow: '1',
    padding: '.5',
    '&:hover': {
      backgroundColor: props =>
        props.color === 'primary'
        ? fade(theme.palette.primary.light, 0.3)
        : fade(theme.palette.secondary.light, 0.3)
    }
  },
  selected: {
    '&:hover': {
      backgroundColor: props =>
        props.color === 'primary'
        ? fade(theme.palette.primary.light, 0.3)
        : fade(theme.palette.secondary.light, 0.3)
    }
  }
}))

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 'initial'
  },
  indicatorTop: {
    height: '100%',
    zIndex: '-10',
    backgroundColor: fade(theme.palette.primary.light, .3),
    borderTop: `2px solid ${theme.palette.primary.main}`
  },
  indicatorBottom: {
    height: '100%',
    zIndex: '-10',
    backgroundColor: fade(theme.palette.secondary.light, .3),
    borderBottom: `2px solid ${theme.palette.secondary.main}`
  },
  exponent: {
    color: theme.palette.primary.main
  },
  remainder: {
    color: theme.palette.secondary.main
  }
}))

function StyledTab(props) {
  const classes = tabStyles(props);
  return (
    <Tab classes={classes} {...props} />
  )
}

export default function Remainders() {
  const classes = useStyles()
  const tabColors = ['primary', 'secondary'];
  const [exponent, setExponent] = useState(1)
  const [remainder, setRemainder] = useState(3);

  const remainders = [6, 2, 1, 4, 5, 3]

  function changeExponent(e, exp) {
    setExponent(exp);
    setRemainder(Math.pow(10, exp) % 7);
  }

  function changeRemainder(e, rem) {
    setRemainder(rem);
    setExponent(remainders[rem - 1]);
  }

  return(
    <Box>
      <Tabs
        value={exponent}
        onChange={changeExponent}
        classes = {{root: classes.root, indicator: classes.indicatorTop}}
      >
        <StyledTab label="exponent" disabled />
        <StyledTab color={tabColors[0]} label="1" />
        <StyledTab color={tabColors[0]} label="2" />
        <StyledTab color={tabColors[0]} label="3" />
        <StyledTab color={tabColors[0]} label="4" />
        <StyledTab color={tabColors[0]} label="5" />
        <StyledTab color={tabColors[0]} label="6" />
      </Tabs>
      <Box style={{fontSize: '1.2rem', letterSpacing: '.1rem', margin: '2rem 0 1rem 0', textAlign: 'center'}}>
        <Latex>$10$</Latex>
        <span className={classes.exponent}>
          <Latex>{`$^{${exponent}}$`}</Latex>
        </span>
        <Latex>$\equiv$</Latex>
        <span className={classes.remainder}>
          <Latex>{`$ \\hspace{2mm} ${remainder}$`}</Latex>
        </span>
        <Latex>{`$\\hspace{1mm} mod \\hspace{1mm} 7$`}</Latex>
      </Box>
      <Box style={{fontSize: '.8rem', margin: '1rem 0 2rem 0', textAlign: 'center', color: '#aaa'}}>
        <Latex>
          {`$10^{${exponent}} =
          ${Math.pow(10, exponent)} =
          7(${Math.floor(Math.pow(10, exponent)/7)}) + ${Math.pow(10, exponent) % 7}$`}
        </Latex>
      </Box>
      <Tabs
        value={remainder}
        onChange={changeRemainder}
        classes = {{root: classes.root, indicator: classes.indicatorBottom}}
      >
        <StyledTab label="remainder" disabled />
        <StyledTab color={tabColors[1]} label="1" />
        <StyledTab color={tabColors[1]} label="2" />
        <StyledTab color={tabColors[1]} label="3" />
        <StyledTab color={tabColors[1]} label="4" />
        <StyledTab color={tabColors[1]} label="5" />
        <StyledTab color={tabColors[1]} label="6" />
      </Tabs>
    </Box>
  )
}
