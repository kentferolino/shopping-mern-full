import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import LoginModal from "../auth/LoginModal";
import Logout from "../auth/Logout";
import MenuIcon from "@material-ui/icons/Menu";
import RegisterModal from "../auth/RegisterModal";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class Navbar extends PureComponent {
  static propTypes = {
    doDrawerOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes, open, doDrawerOpen } = this.props;
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <span className="navbar-text mr-3">
          <strong> {user ? `Welcome ${user.name}` : ""} </strong>
        </span>
        <Logout />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <RegisterModal />
        <LoginModal />
      </Fragment>
    );

    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar disableGutters={!open}>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={doDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {isAuthenticated ? (
              <Link to="/shop">Shopping List</Link>
            ) : (
              <Link to="/">Shopping</Link>
            )}
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Navbar);
