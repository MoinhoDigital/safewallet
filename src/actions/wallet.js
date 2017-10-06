import { CREATE_WALLET } from './';
import { setupAccount } from '../utils/safeApp';

function completeCreateWallet(text) {
	return {
		type: CREATE_WALLET,
		payload: text
	};
}

export function createWallet(app, text) {
	return dispatch => {
		setupAccount(app, text)
			.then(res => dispatch(completeCreateWallet(res)));
	};
}