import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import bindActions from '../utils/bindActions';
import reducers from '../reducers';
import { startInitializeApp, startAuthorizeApp } from '../actions/authorization';

@connect(reducers, bindActions({ startInitializeApp, startAuthorizeApp }))
export default class Authorization extends Component {
	render() {
		const { startInitializeApp, startAuthorizeApp, authorizations: { initializing, appHandle, authorizing, authUri  } } = this.props;
		if(appHandle && authorizing && !authUri ) {
			startAuthorizeApp(appHandle);
		}
		if (authUri) {
			route(`/create_wallet`, true);
		}
		if(initializing) {
			startInitializeApp();
		}
		if(!initializing && !appHandle) {
			return <h2>Connection Failed.</h2>;
		}
		return (
			<h2>Waiting for authorization</h2>
		);
	}
}
