import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {

      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg })
      }
      else {
        this.setState({ msg: null })
      }
    }

    // Close modal after being authenticated.
    if (this.state.modal && isAuthenticated) {
      this.toggle();
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({ modal: !this.state.modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    // Create user object
    const user = {
      email,
      password
    };

    // Attempt to register
    this.props.login(user);
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle} href='#' >
          Login
				</Button>
        <Dialog open={this.state.modal} onClose={this.toggle}>
          <DialogTitle onClose={this.toggle} id="login-dialog-title">Login</DialogTitle>
          <DialogContent>
            {this.state.msg ?
              (<DialogContentText id="alert-dialog-description" color="secondary">{this.state.msg}</DialogContentText>)
              : null
            }
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              name="email"
              id="email"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              name="password"
              id="password"
              onChange={this.onChange}
              fullWidth
            />
            <DialogActions>
              <Button onClick={this.onSubmit}>
                Login
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);
