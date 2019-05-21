import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import AppNavbar from '../AppNavbar';
import Shopping from '../Shopping';
import Home from './Home';
import Front from './Front';
import { connect } from 'react-redux';

const routes = [
	{
		path: "/bubblegum",
		main: () => <h2>Bubblegum</h2>
	},
	{
		path: "/shoelaces",
		main: () => <h2>Shoelaces</h2>
	}
];

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
	static propTypes = {

	};
	render() {
		const { auth } = this.props;
		debugger;
		return (
			<Fragment>
				{auth.isLoading !== true &&
					<div style={{ flex: 1, padding: "10px" }}>
						{routes.map((route) => (
							// Render more <Route>s with the same paths as
							// above, but different components this time.
							<Route
								key={route.path}
								path={route.path}
								exact={route.exact}
								component={route.main}
							/>
						))}
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
)(Main);