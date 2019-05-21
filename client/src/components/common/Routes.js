import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AppNavbar from '../AppNavbar';
import Shopping from '../Shopping';
import Home from './Home';
import Front from './Front';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

class Routes extends Component {
  static propTypes = {

  };
  render() {
    const { auth } = this.props;
    debugger;
    return (
      <Fragment>
        {auth.isLoading !== true &&
          <div className="App">
            <AppNavbar />
            <Route exact path='/' render={props => { return auth.isAuthenticated ? <Home auth={auth} /> : <Front /> }} />
            <PrivateRoute path='/home' component={Home} auth={auth} />
            <PrivateRoute path='/shop' component={Shopping} auth={auth} />
          </div>}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null
)(Routes);