/**
 * Is this necessary? tbd.
 * If it's not? idk. tbd.
 **/

import Box from '@material-ui/core/Box';
import NavBar from './NavBar'

export default function FixedNav(props) {
  return(
    <Box height="100%" width="100%" position="fixed">
      <Box height="100%" display="flex" flexDirection="column">
        <NavBar pageId={props.pageId}/>
        {props.children}
      </Box>
    </Box>
  )
}
