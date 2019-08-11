import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core';
import ScrollNav from '../components/ScrollNav';
import RegisterForm from '../components/RegisterForm';

const useStyles = makeStyles( theme => ({
  form: {
    minWidth: '500px',
    width: '50%',
    margin: '0 auto'
  }
}));

export default function Signup() {
  const classes = useStyles();

  return(
    <ScrollNav pageId="signup">
      <Box className={classes.form}>
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
        <RegisterForm/>
      </Box>
    </ScrollNav>
  )
}
