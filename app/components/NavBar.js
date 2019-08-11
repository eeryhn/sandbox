import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import LoginRegisterPanel from './LoginRegisterPanel';
import NavMenu from './NavMenu';
import { UserContext } from './UserContext';
import axios from 'axios';

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
  },
  drawer: {
    minWidth: '300px'
  }
}));

function NavBar(props) {
  const [dialogOpen, toggleDialog] = useState(false);
  const [dialogPanel, setDialogPanel] = useState('login');
  const [menuOpen, toggleMenu] = useState(false);
  const classes = useStyles();

  function openLogin() {
    setDialogPanel('login');
    toggleDialog(true);
  }

  function openRegister() {
    setDialogPanel('register');
    toggleDialog(true);
  }

  function logout() {
    axios.post('/auth/logout')
    .then( res => {
      window.location.reload();
    })
    .catch( err => {
      console.log(err);
    });
  }

  function AccountButtons() {
    return(
      <UserContext.Consumer>
        { user => {
          if(user)
            return(
              <React.Fragment>
                {user.name}
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </React.Fragment>
            );
          else
            return(
              <React.Fragment>
                <Button color="inherit" className={classes.linkBtn} onClick={openLogin}>
                  Login
                </Button>
                |
                <Button color="inherit" className={classes.linkBtn} onClick={openRegister}>
                  Register
                </Button>
              </React.Fragment>
            );
        }}
      </UserContext.Consumer>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              onClick={() => toggleMenu(true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.pageId}
            </Typography>
            <AccountButtons/>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        classes={{paper: classes.drawer}}
        open={menuOpen}
        onClose={() => toggleMenu(false)}
      >
        <NavMenu/>
      </Drawer>
      <Dialog
        aria-labelledby="login-or-register-modal"
        open={dialogOpen}
        onClose={() => toggleDialog(false)}
        PaperProps={{square: true}}
        maxWidth = {false}
        classes={{paper: classes.dialog}}
      >
        <LoginRegisterPanel panel={dialogPanel} />
      </Dialog>
    </React.Fragment>
  );
}

NavBar.propTypes = {
  pageId: PropTypes.string.isRequired
}

export default NavBar;
