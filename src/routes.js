import { h, Component } from 'preact';
import { Router, Route } from 'preact-router';

import Dashboard from './components/Dashboard';
import CreateWallet from './components/CreateWallet';
import ErrorPage from './components/404';


import { connect } from 'preact-redux';
import { route } from 'preact-router';

import bindActions from './bindActions';
import reducers from './reducers';
import { startInitializeApp, startAuthorizeApp } from './actions/authorization';

@connect(reducers, bindActions({ startInitializeApp, startAuthorizeApp }))
export default class Routes extends Component {
	render() {
		console.log('aqui');
		const { startInitializeApp, startAuthorizeApp, authorizations: { initializing, appHandle, authorizing, authUri  } } = this.props;
		if(appHandle && authorizing && !authUri ) {
			console.log('Authorizing', appHandle);
			startAuthorizeApp(appHandle);
		}
		if (authUri) {
			console.log('authURI:', authUri);
		}
		if(initializing) {
			startInitializeApp();
		}
		if(!initializing && !appHandle) {
			return <h2>Connection Failed.</h2>;
		}
		return (
			<Router>
				<CreateWallet path='/' />
				<Dashboard path='/dashboard' />
				<ErrorPage default />
			</Router>
		);
			
	}
}