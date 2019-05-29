import React, { Component, Fragment } from 'react';
import { logout } from '../../actions/authActions'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Proptypes from 'prop-types';

class Logout extends Component {
  static propTypes = {
    logout: Proptypes.func.isRequired
  }
  render() {
    return (
      <Fragment>
        <Button onClick={this.props.logout} href='#'>Logout</Button>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);