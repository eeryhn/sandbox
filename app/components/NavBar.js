import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MenuIcon from '@material-ui/icons/Menu';
import LoginRegisterPanel from './LoginRegisterPanel';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkBtn: {
    background: 'none',
    fontSize: '.75rem',
    '&:hover': {
      background: 'none',
      textDecoration: 'underline'
    }
  },
  dialog: {
    maxWidth: '100%',
    width: '500px',
    margin: '1rem'
  }
}));

export default function NavBar(props) {
  const [open, toggleOpen] = useState(false);
  const [panel, setPanel] = useState('login');
  const classes = useStyles();

  function openLogin() {
    setPanel('login');
    toggleOpen(true);
  }

  function openRegister() {
    setPanel('register');
    toggleOpen(true);
  }

  function handleClose() {
    toggleOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.pageId}
          </Typography>
          <Button
          color="inherit"
          className={classes.linkBtn}
          onClick={openLogin}>Login</Button>
          |
          <Button
          color="inherit"
          className={classes.linkBtn}
          onClick={openRegister}>Register</Button>
        </Toolbar>
      </AppBar>
      <Dialog
      aria-labelledby="login-or-register-modal"
      open={open}
      onClose={handleClose}
      PaperProps={{square: true}}
      maxWidth = {false}
      classes={{paper: classes.dialog}}
      >
        <LoginRegisterPanel panel={panel} />
      </Dialog>
    </div>
  );
}
