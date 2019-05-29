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
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class RegisterModal extends Component {
	state = {
		modal: false,
		name: '',
		email: '',
		password: '',
		msg: null,
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired,
	}

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {

			// Check for register error
			if (error.id === 'REGISTER_FAIL') {
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

		const { name, email, password } = this.state;

		// Create user object
		const newUser = {
			name,
			email,
			password
		};

		// Attempt to register
		this.props.register(newUser);
	};

	render() {
		return (
			<div onClick={this.toggle}>
				<Button onClick={this.toggle} href='#' >
					Register
				</Button>
				<Dialog open={this.state.modal} onClose={this.toggle}>
					<DialogTitle onClose={this.toggle} id="register-dialog-title">Register</DialogTitle>
					<DialogContent>
						{this.state.msg ?
							(<DialogContentText id="alert-dialog-description" color="secondary">{this.state.msg}</DialogContentText>)
							: null
						}
						<TextField
							autoFocus
							margin="dense"
							label="Name"
							type="text"
							name="name"
							id="name"
							onChange={this.onChange}
							fullWidth
						/>
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
							autoFocus
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
								Register
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
	{ register, clearErrors }
)(RegisterModal);
