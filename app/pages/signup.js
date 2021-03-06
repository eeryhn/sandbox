import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ScrollNav from '../components/ScrollNav';
import RegisterForm from '../components/RegisterForm';

const useStyles = makeStyles( theme => ({
  container: {
    minWidth: '500px',
    width: '50%',
    margin: '0 auto'
  }
}));

const Signup = ({query}) => {
  const classes = useStyles();

  function returnHome() {
    window.location.href='/';
  }

  return(
    <ScrollNav pageId="signup">
      <Box className={classes.container}>
        <Typography variant="h6">
          A warning:
        </Typography>
        <p>
          This project is "secured" by exactly one me, which just means you should
          assume it's not really secured.  At all.
        </p>
        <p>
          Some baseline (possibly probably poorly executed) barriers, restricted registration,
          and the fact that this (very small, limited, and largely unknown) toy's
          value is entirely subjective are pretty much the scraps of cardboard
          that make up my fort, sword, and shield.
        </p>
        <p>
          So, seriously: Don't reuse passwords.  Or am I the only one still
          doing that.
        </p>
        <RegisterForm onComplete={returnHome} registrationCode={query.code} />
      </Box>
    </ScrollNav>
  )
}

Signup.getInitialProps = ({query}) => {
  return {query}
}

export default Signup;
