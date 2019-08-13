/**
 * ):
 * ...well...it ain't broke...?
 * kind of depends on your definition of broke.
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
  const { valid, setValue, text, errorText, ...attr } = props;

  const [helperText, setText] = useState(text);
  const [icon, setIcon] = useState(
    <Icon>
    </Icon>
  );

  function handleInput(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    if (valid) {
      setIcon(
        <Icon style={{color: theme.palette.success.main}}>
          <Done/>
        </Icon>
      );
      setText(text);
    } else if (valid !== undefined) {
      setIcon(
        <Icon color="error">
          <ErrorOutline/>
        </Icon>
      );
      if(errorText) setText(errorText);
    }
  }, [valid])

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
      helperText={helperText}
      {...attr}
    />
  )
}

VTextField.propTypes = {
  setValue: PropTypes.func.isRequired
}

export default VTextField;
