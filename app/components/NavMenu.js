import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles'
import { Box, Link, List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core';
import NavSubmenu from './NavSubmenu';

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'inherit !important',
      textDecoration: 'underline',
      textDecorationColor: `${theme.palette.primary.main}`
    }
  },
  selected: {
    backgroundColor: 'inherit !important',
    color: 'rgba(0, 0, 0, 1)',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  link: {
    textDecoration: 'none'
  }
}));

export default function NavMenu() {
  const classes = useStyles();
  const router = useRouter();
  const path = router.route;
  const pages = {
    'In Progress': {
      'Cyclic Numbers': '/cyclic-numbers'
    }
  }

  function MenuItem(props) {
    const selected = props.href===path;
    const listItem =
      <ListItem
        selected={selected}
        classes={{selected: classes.selected}}
        className={classes.root}
      >
        <ListItemText>
          <Typography variant="body2">
            {props.title}
          </Typography>
        </ListItemText>
      </ListItem>

    if(selected) {
      return listItem;
    } else {
      return(
        <Link href={props.href} className={classes.link}>
          {listItem}
        </Link>
      );
    }
  }

  function getPageList(items) {
    let listItems = [];
    for (var key in items) {
      let item = items[key];
      if(typeof(item) === 'string') {
        listItems.push(
          <MenuItem key={key} title={key} href={item}/>
        );
      } else if (item !== null && typeof(item) === 'object') {
          var sublist = getPageList(item);
          listItems.push(
            <NavSubmenu key={key} category={key}>
              <List>
                {sublist}
              </List>
            </NavSubmenu>
          );
      } else {
        console.warn('weird key found in pages object? idk');
      }
    }
    return (
      <React.Fragment>
        {listItems}
      </React.Fragment>
    )
  }

  return(
    <div>
      <List>
        <Link href="/">
          <ListItem button className={classes.root}>
            <ListItemText>
              Home
            </ListItemText>
          </ListItem>
        </Link>
        <Divider/>
        {getPageList(pages)}
      </List>
    </div>
  )
}
