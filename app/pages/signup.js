import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
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
        <p>
          For the record, this site is secured by exactly one me.  So you should
          assume it's not really secured.  At all.
        </p>
        <p>
          Restricted registration and the fact that this toy isn't worth that much
          are pretty much the scraps of cardboard that make up my fort.
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
