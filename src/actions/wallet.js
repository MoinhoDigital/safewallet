import { CREATE_WALLET, GET_WALLET_IDS } from './';
import { setupAccount } from '../utils/safeApp';
import fetchWalletIds from '../utils/fetchWalletIds';

export function createWallet(appHandle, text) {
	return dispatch => {
		setupAccount(appHandle, text)
			.then(res => dispatch(completeCreateWallet(res)));
	};
}
function completeCreateWallet(account) {
	console.log('Action completeCreateWallet: ', account);
	return {
		type: CREATE_WALLET,
		payload: account
	};
}

export function getWalletIds(appHandle) {
	console.log('Action getWalletIds:', appHandle);
	return dispatch => {
		console.log('DISPATCH getWalletIds:');
		fetchWalletIds(appHandle)
			.then(res => dispatch(completeGetWalletIds(res)));
	};
};
function completeGetWalletIds(walletIds) {
	console.log('Action completeGetWalletIds: ', walletIds);
	return {
		type: GET_WALLET_IDS,
		payload: walletIds
	};
}
