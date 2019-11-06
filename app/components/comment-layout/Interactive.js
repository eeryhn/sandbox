/* REVIEW: Kind of defaulting to what I remember of bootstrap layout...ing.
 *         Is this...right?
 */

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '.2rem',
    border: `1px solid ${theme.palette.primary.light}`,
    padding: '1rem 2rem',
    margin: '0 -.3rem .5rem -.3rem'
  }
}))

export default function Interactive(props) {
  const classes = useStyles();
  return(
    <Box className={classes.root}>
      {props.children}
    </Box>
  )
}
