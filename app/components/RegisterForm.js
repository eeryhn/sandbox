import { useState, useEffect } from 'react';
import VTextField from './VTextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export default function RegisterForm(props) {
  const [fields, setFields] = useState({
    name: {
      value: ''
    },
    email: {
      value: ''
    },
    pw: {
      value: ''
    },
    pwc: {
      value: ''
    }
  });
  const [errorText, setError] = useState('');

  const NAME_PATT = /^([\S]{3,32})$/g;
  const EMAIL_PATT = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const PASS_PATT = /((?!^[0-9]*$)(?!^[a-zA-Z]*$)^[a-zA-Z0-9\S]{6,30})$/g;

  function handleInput(field, val) {
    setFields({
      ...fields,
      [field]: {
        value: val,
        valid: checkField(field, val)
      }
    });
  }

  function allValid() {
    for(var key in fields) {
      if(!fields[key].valid) return false;
    }
    return true;
  }

  function submitRegister() {
    axios.put('/auth/register', {
      data: {
        name: fields.name.value,
        email: fields.email.value,
        password: fields.pw.value,
        reg_code: props.registrationCode
      }
    })
    .then( res => {
      if(props.onComplete) props.onComplete();
    })
    .catch( err => {
      if(err.response.data) {
        setError(err.response.data);
      } else {
        setError('Something went wrong. ):')
      }
    })
  }

  function checkField(field, val) {
    switch(field) {
      case 'name':
        return NAME_PATT.test(val);
      case 'email':
        return EMAIL_PATT.test(val);
      case 'pw':
        return PASS_PATT.test(val);
      case 'pwc':
        return (PASS_PATT.test(val) && fields.pw.value === val);
    }
  }

  return(
    <form>
      <VTextField required
        label="username"
        value={fields.name.value}
        valid={fields.name.valid}
        text="3-32 characters, cannot contain whitespace"
        setValue={(val) => handleInput('name', val)}
        variant="outlined"
        fullWidth={true}
        margin="normal"
      />
      <VTextField required
        id="email"
        label="email"
        autoComplete="username email"
        value={fields.email.value}
        valid={fields.email.valid}
        setValue={(val) => handleInput('email', val)}
        variant="outlined"
        fullWidth={true}
        margin="normal"
      />
      <VTextField required
        id="password"
        label="password"
        type="password"
        autoComplete="new-password"
        value={fields.pw.value}
        valid={fields.pw.valid}
        text="6-30 characters, must include one letter, one number, no whitespace"
        setValue={(val) => handleInput('pw', val)}
        variant="outlined"
        fullWidth={true}
        margin="normal"
      />
      <VTextField required
        id="confirm"
        label="confirm password"
        type="password"
        autoComplete="new-password"
        value={fields.pwc.value}
        valid={fields.pwc.valid}
        errorText="Passwords must match"
        setValue={(val) => handleInput('pwc', val)}
        variant="outlined"
        fullWidth={true}
        margin="normal"
      />
      <div>
        <Button variant="contained" disabled={!allValid()} color="primary" onClick={submitRegister}>
          Register
        </Button>
        { errorText &&
          <Typography color="error" variant="body2">
            {errorText}
          </Typography>
        }
      </div>
    </form>
  )
}
