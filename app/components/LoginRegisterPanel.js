import React, { PureComponent } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LoginForm from './LoginForm';

class LoginRegisterPanel extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        panel: (props.panel || 'login'),
      };
      this.switchPanel = this.switchPanel.bind(this);
    }

    switchPanel(e, value) {
      this.setState({panel: value});
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
              <LoginForm/>
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
