import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import bindActions from '../util';
import reducers from '../reducers';
import { startInitializeApp, startAuthorizeApp } from '../actions/authorization';

@connect(reducers, bindActions({ startInitializeApp, startAuthorizeApp }))
export default class Authorization extends Component {
	render() {
		const { startInitializeApp, startAuthorizeApp, authorizations: { initializing, appHandle, authorizing, authUri  } } = this.props;
		if(appHandle && authorizing) {
			startAuthorizeApp(appHandle);
		}
		if (authUri) {
			route(`/dashboard`, true);
		}
		if(initializing) {
			startInitializeApp();
		}
		if(!initializing && !appHandle) {
			return <h2 onClick={() => route('/dashboard', true)}>Connection Failed.</h2>;
		}
		return (
			<h2>Waiting for authorization</h2>
		);
	}
}
