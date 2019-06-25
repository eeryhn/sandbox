import Header from './Header';
import Box from '@material-ui/core/Box';

const Layout = props => (
  <Box>
    <Header />
    {props.children}
  </Box>
);

export default Layout;
