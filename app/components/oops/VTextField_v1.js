/**
 * Component to handle input validation/input field state changes/error messages
 *
 * REVIEW: probably not the best way to handle this.  Keep looking into popular
 *         solutions (get better at google u scurb)
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Done from '@material-ui/icons/Done';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(theme => ({
  input: {
    '&$outline': {
      borderColor: `${theme.palette.success.main} !important`
    }
  },
  outline: {
    borderColor: `${theme.palette.success.main} !important`
  },
  label: {
    color:  `${theme.palette.success.main} !important`
  }
}));

function VTextField(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { validator, setValue, ...attr} = props;
  const [valid, setValid] = useState();
  const [icon, setIcon] = useState(
    <Icon>
    </Icon>
  );

  function handleInput(e) {
    const val = e.target.value;
    const isValid = validator(val);
    if(isValid) {
      setIcon(
        <Icon style={{color: theme.palette.success.main}}>
          <Done/>
        </Icon>
      );
    } else {
      setIcon(
        <Icon color="error">
          <ErrorOutline/>
        </Icon>
      );
    }
    setValue(val);
    setValid(isValid);
  }

  return(
    <TextField
      onChange={handleInput}
      error={!(valid === undefined || valid)}
      InputLabelProps={{
        classes: {
          root:  `${valid && classes.label}`
        },
      }}
      InputProps={{
        classes: {
          root: `${valid && classes.input}`,
          notchedOutline: `${valid && classes.outline}`
        },
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>
      }}
      {...attr}
    />
  )
}

VTextField.propTypes = {
  setValue: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired
}

export default VTextField;
