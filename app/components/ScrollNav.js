import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import NavBar from './NavBar'


export default function ScrollNav(props) {
  return(
    <React.Fragment>
      <NavBar pageId={props.pageId}/>
      <Container>
        <Box p={3}>
        {props.children}
        </Box>
      </Container>
    </React.Fragment>
  )
}
