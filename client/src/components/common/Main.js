import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Shopping from '../Shopping';
import Home from './Home';
import Front from './Front';
import { connect } from 'react-redux';
import AppWrapper from '../AppWrapper';

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
		return (
			<Fragment>
				{auth.isLoading !== true &&
					<AppWrapper>
						<React.Fragment><Route exact path='/' render={props => { return auth.isAuthenticated ? <Home auth={auth} /> : <Front /> }} />
							<PrivateRoute path='/home' component={Home} auth={auth} />
							<PrivateRoute path='/shop' component={Shopping} auth={auth} /></React.Fragment>
					</AppWrapper>
				}
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