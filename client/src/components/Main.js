import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import Shopping from "./Shopping";
import Home from "./Home";
import Front from "./Front";
import { connect } from "react-redux";
import AppNavbar from "./navs/AppNavbar";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

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

class Main extends Component {
  static propTypes = {};
  render() {
    const { auth, classes } = this.props;
    return (
      <Fragment>
        {auth.isLoading !== true && (
          <div class={classes.root}>
            <AppNavbar isAuthenticated={auth.isAuthenticated} />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Route
                exact
                path="/"
                render={props => {
                  return auth.isAuthenticated ? (
                    <Home auth={auth} />
                  ) : (
                    <Front />
                  );
                }}
              />
              <PrivateRoute path="/home" component={Home} auth={auth} />
              <PrivateRoute path="/shop" component={Shopping} auth={auth} />
            </main>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles, { withTheme: true })(Main));
