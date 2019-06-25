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

import Header from './Header';
import { Component } from 'react';
import Box from '@material-ui/core/Box';

class SplitLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rightWidth: props.rightWidth
    };
  }

  render() {
    return(
      <Box>
        <Header/>
        <Box display="flex" p={1}>
          <Box flexGrow={1}>
            {this.props.left}
          </Box>
          <Box width={(this.state.rightWidth * 100) + "%"} flexShrink="0">
            {this.props.right}
          </Box>
        </Box>
      </Box>
    );
  }

}

export default SplitLayout;
