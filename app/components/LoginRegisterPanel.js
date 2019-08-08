import React, { PureComponent } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginRegisterPanel extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        panel: (props.panel || 'login'),
        values: {
          user: '',
          pw: ''
        }
      };
      this.switchPanel = this.switchPanel.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.submitLogin = this.submitLogin.bind(this);
    }

    switchPanel(e, value) {
      this.setState({panel: value});
    }

    handleInput(e, field) {
      this.setState({
        values: {
          ...this.state.values,
          [field]: e.target.value
        }
      });
    }

    submitLogin(e) {

    }

    render() {
      return(
        <React.Fragment>
          <Tabs
            value={this.state.panel}
            onChange={this.switchPanel}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="login" value="login"/>
            <Tab label="register" value="register"/>
          </Tabs>
          <Box p={3}>
            {this.state.panel == 'login' &&
              <form>
                <TextField
                  id="user"
                  label="username or email"
                  value={this.state.values.user}
                  onChange={(e) => this.handleInput(e, 'user')}
                  variant="outlined"
                  fullWidth={true}
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="password"
                  type="password"
                  value={this.state.values.pw}
                  onChange={(e) => this.handleInput(e, 'pw')}
                  variant="outlined"
                  fullWidth={true}
                  margin="normal"
                />
                <div>
                  <Button variant="contained" color="primary" onClick={this.submitLogin}>
                    Login
                  </Button>
                </div>
              </form>
            }
            {this.state.panel == 'register' &&
              <div>
                <Typography align="center" variant="h3">
                  Someday...?
                </Typography>
              </div>
            }
          </Box>
        </React.Fragment>
      );
    }
}

export default LoginRegisterPanel;
