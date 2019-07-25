/* Basic layout component for handling split view.
 *
 * TODO:
 *  - Interactive
 *     |-> Left/right panel collapse
 *     |-> Panel resizing
 *
 * NOTE:
 *  - +1 reason to consider redux.  Maintain container state for consistent viewing
 *    between pages.  But the use case seems a bit...overkill.  Think about it.
 */

import { useState } from 'react';
import ProptTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  scroll: {
    height: '100%',
    padding: '0',
    overflow: 'auto'
  }
}));

function SplitLayout(props) {
  const [split, setSplit] = useState(props.split || 0.6);
  const classes = useStyles();

  return(
    <Box display="flex" p={0}>
      <Box className={classes.scroll} flexGrow={1}>
        {props.left}
      </Box>
      <Box className={classes.scroll} width={(split * 100) + "%"} ml={2} flexShrink="0">
        {props.right}
      </Box>
    </Box>
  );
}

// class SplitLayout extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       rightWidth: props.rightWidth
//     };
//   }
//
//   render() {
//     return(
//       <Box display="flex" p={1}>
//         <Box flexGrow={1}>
//           {this.props.left}
//         </Box>
//         <Box width={(this.state.rightWidth * 100) + "%"} flexShrink="0">
//           {this.props.right}
//         </Box>
//       </Box>
//     );
//   }
//
// }

export default SplitLayout;
