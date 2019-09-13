import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, amber } from '@material-ui/core/colors';
import EncodeSE from './fonts/EncodeSansSemiExpanded-Regular.ttf';
import EncodeBold from './fonts/EncodeSansSemiExpanded-Medium.ttf';

const encode = [
  {
    fontFamily: 'EncodeSE',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      url(${EncodeSE}) format('truetype')
    `
  },
  {
    fontFamily: 'EncodeSE',
    fontStyle: 'bold',
    fontDisplay: 'swap',
    fontWeight: 700,
    src: `
      url(${EncodeBold}) format('truetype')
    `
  }];

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    success: {
      main: lightBlue[500],
      contrastTest: '#000'
    },
    error: {
      main: amber[800],
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: [
      'EncodeSE',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': encode,
      }
    },
    MuiInputBase: {
      root: {
        fontSize: '.875rem'
      }
    },
    MuiOutlinedInput: {
      root: {
        fontSize: '.875rem'
      },
      multiline: {
        padding: '.6rem .75rem'
      }
    }
  }
});

export default theme;
