import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = { name: this.state.name };
    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {isAuthenticated
          ? <Button
            onClick={this.toggle}>
            Add Items
          </Button>
          : <h4 className="mb-3 ml-4">Please login to manage items</h4>}

        <Dialog open={this.state.modal} onClose={this.toggle}>
          <DialogTitle onClose={this.toggle} id="add-shopping-title">Add To Shopping List</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              name="name"
              id="item"
              onChange={this.onChange}
              fullWidth
            />
            <DialogActions>
              <Button onClick={this.onSubmit}>
                Add item
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
