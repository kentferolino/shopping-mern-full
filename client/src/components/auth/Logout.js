import React, { Component, Fragment } from 'react';
import { logout } from '../../actions/authActions'
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import Proptypes from 'prop-types';

class Logout extends Component {
  static propTypes = {
    logout: Proptypes.func.isRequired
  }
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href='#'>Logout</NavLink>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);