import { Component } from 'react';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    this.setState({comment: e.target.value});
  }

  submitForm() {

  }

  render() {
    return(
      <form>
        <OutlinedInput value={this.state.comment} onChange={this.handleChange}
          fullWidth={true} margin="dense"
          multiline={true} rows={3} rowsMax={9}
        />
        <Box>
          <Button variant="outlined" color="primary" onClick={this.submitForm}>
            Post
          </Button>
        </Box>
      </form>
    );
  }
}

export default CommentForm;
