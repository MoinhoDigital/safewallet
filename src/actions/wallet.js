import { CREATE_WALLET } from './';
import { setupAccount } from '../utils/safeApp';

function completeCreateWallet(account) {
	console.log('Action completeCreateWallet: ', account);
	return {
		type: CREATE_WALLET,
		payload: account
	};
}

export function createWallet(app, text) {
	return dispatch => {
		setupAccount(app, text)
			.then(res => dispatch(completeCreateWallet(res)));
	};
}