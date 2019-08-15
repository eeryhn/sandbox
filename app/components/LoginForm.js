import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export default function LoginForm(props) {
  const [fields, setFields] = useState({
    email: '',
    pw: ''
  });
  const [errorText, setError] = useState('');

  function handleInput(e, field) {
    setFields({
      ...fields,
      [field]: e.target.value
    })
  }

  function submitLogin() {
    axios.post('/auth/login', {
      email: fields.email,
      password: fields.pw
    })
    .then( res => {
      if(res.data.user) {
        window.location.reload();
      } else {
        setError('Oops!  Something went wrong.  Try again later?');
      }
    })
    .catch( err => {
      if(err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError('Oops!  Something went wrong.  Try again later?');
      }
    })

  }

  return(
    <form>
      <TextField
        id="email"
        label="email"
        value={fields.email}
        onChange={(e) => handleInput(e, 'email')}
        variant="outlined"
        fullWidth={true}
        margin="normal"
      />
      <TextField
        id="password"
        label="password"
        type="password"
        value={fields.pw}
        onChange={(e) => handleInput(e, 'pw')}
        variant="outlined"
        fullWidth={true}
        margin="normal"
      />
      <div>
        <Button variant="contained" color="primary" onClick={submitLogin}>
          Login
        </Button>
      </div>
      { errorText &&
        <Typography color='error' variant='body2'>
          {errorText}
        </Typography>
      }
    </form>
  )
}
