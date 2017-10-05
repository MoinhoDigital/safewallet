import { APP_INITIALIZE, APP_AUTHORIZE } from './';
import { initialiseApp, authorizeApp } from '../utils/safeApp';

function completeInitializeApp(appHandle) {
	return {
		type: APP_INITIALIZE,
		payload: appHandle
	};
}

export function startInitializeApp() {
	return dispatch => {
		return initialiseApp('safewallet.moinhodigital.0.1', 'Safe Bank', 'luandro')
		.then(res => dispatch(completeInitializeApp(res)));
	};
}

function completeAuthorizeApp(authUri) {
	console.log('Authorized', authUri);
	return {
		type: APP_AUTHORIZE,
		payload: authUri
	};
}

export function startAuthorizeApp(appHandle) {
	console.log('Start authorize', appHandle);
	return dispatch => {
		return authorizeApp(appHandle)
		.then(res => dispatch(completeAuthorizeApp(res)));
	};
}